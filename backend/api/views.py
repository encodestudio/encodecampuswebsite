from collections import Counter
import logging

from django.conf import settings
from django.core.mail import EmailMessage
from django.db.models import Count
from django.utils import timezone
from rest_framework import generics, mixins, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from . import pricing
from .models import (
    BlogPost,
    ContactMessage,
    DemoRequest,
    FAQ,
    Feature,
    NewsletterSubscriber,
    PricingPlan,
    Solution,
)
from .serializers import (
    BlogPostSerializer,
    ContactMessageSerializer,
    DemoRequestSerializer,
    FAQSerializer,
    FeatureSerializer,
    NewsletterSubscriberSerializer,
    PricingPlanSerializer,
    SolutionSerializer,
)

logger = logging.getLogger(__name__)


def send_internal_email(subject, body, reply_to):
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=settings.CONTACT_FORM_TO,
        cc=settings.CONTACT_FORM_CC,
        reply_to=[reply_to],
    )
    return email.send(fail_silently=False)


def send_customer_ack(to_email, subject, body):
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.CUSTOMER_ACK_FROM,
        to=[to_email],
        reply_to=settings.CONTACT_FORM_TO,
    )
    return email.send(fail_silently=False)


def send_form_notifications(request_id, internal_email, customer_ack):
    failures = []
    for label, email in (("internal", internal_email), ("customer acknowledgement", customer_ack)):
        try:
            if email() != 1:
                failures.append(f"{label} email was not accepted by the email backend")
        except Exception:
            logger.exception("Failed to send %s email for form submission %s", label, request_id)
            failures.append(f"{label} email could not be sent")
    if failures:
        raise RuntimeError("; ".join(failures))


class FeatureViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Feature.objects.filter(is_published=True)
    serializer_class = FeatureSerializer
    lookup_field = "slug"

    def get_queryset(self):
        qs = super().get_queryset()
        pillar = self.request.query_params.get("pillar")
        if pillar:
            qs = qs.filter(pillar=pillar)
        return qs


class SolutionViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    lookup_field = "slug"


class PricingPlanListView(generics.ListAPIView):
    serializer_class = PricingPlanSerializer

    def get_queryset(self):
        qs = PricingPlan.objects.all()
        institution_type = self.request.query_params.get("institution_type")
        if institution_type:
            qs = qs.filter(institution_type=institution_type)
        return qs


class FAQListView(generics.ListAPIView):
    serializer_class = FAQSerializer

    def get_queryset(self):
        qs = FAQ.objects.filter(is_active=True)
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        return qs


class BlogPostViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = "slug"


class DemoRequestCreateView(generics.CreateAPIView):
    queryset = DemoRequest.objects.all()
    serializer_class = DemoRequestSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "form-submit"

    def perform_create(self, serializer):
        request_obj = serializer.save()
        institution_type = request_obj.get_institution_type_display()
        body = "\n".join(
            [
                "New Encode Campus demo request",
                "",
                f"Name: {request_obj.name}",
                f"Organisation: {request_obj.organisation}",
                f"Designation: {request_obj.designation or '-'}",
                f"Institution type: {institution_type}",
                f"Student / learner strength: {request_obj.student_strength or '-'}",
                f"City: {request_obj.city or '-'}",
                f"Phone: {request_obj.phone}",
                f"Email: {request_obj.email}",
                f"Current system: {request_obj.current_system or '-'}",
                f"Primary challenge: {request_obj.primary_challenge or '-'}",
                f"Plan interest: {request_obj.plan_interest or '-'}",
                f"Estimated monthly: {request_obj.estimated_monthly or '-'}",
                f"Source: {request_obj.source}",
                f"Segment: {request_obj.get_segment_display()}",
                "",
                "Message:",
                request_obj.message or "-",
            ]
        )
        send_form_notifications(
            request_obj.id,
            lambda: send_internal_email(
                subject=f"Encode Campus demo request: {request_obj.organisation}",
                body=body,
                reply_to=request_obj.email,
            ),
            lambda: send_customer_ack(
                to_email=request_obj.email,
                subject="We received your Encode Campus demo request",
                body="\n".join(
                    [
                        f"Hi {request_obj.name},",
                        "",
                        "Thanks for requesting a walkthrough of Encode Campus.",
                        "We have received your details and will get back to you shortly to schedule the demo.",
                        "",
                        f"Organisation: {request_obj.organisation}",
                        f"Phone: {request_obj.phone}",
                        "",
                        "Regards,",
                        "Shivam",
                        "Encode Studio",
                    ]
                ),
            ),
        )


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "form-submit"

    def perform_create(self, serializer):
        message = serializer.save()
        subject = message.subject or "Website contact form query"
        body = "\n".join(
            [
                "New Encode Campus contact form query",
                "",
                f"Name: {message.name}",
                f"Email: {message.email}",
                f"Phone: {message.phone or '-'}",
                f"Organisation: {message.organisation or '-'}",
                f"Subject: {message.subject or '-'}",
                "",
                "Message:",
                message.message,
            ]
        )
        send_form_notifications(
            message.id,
            lambda: send_internal_email(
                subject=f"Encode Campus contact: {subject}",
                body=body,
                reply_to=message.email,
            ),
            lambda: send_customer_ack(
                to_email=message.email,
                subject="We received your Encode Campus message",
                body="\n".join(
                    [
                        f"Hi {message.name},",
                        "",
                        "Thanks for contacting Encode Campus.",
                        "We have received your message and will reply shortly.",
                        "",
                        "Regards,",
                        "Shivam",
                        "Encode Studio",
                    ]
                ),
            ),
        )


class NewsletterSubscribeView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "form-submit"


@api_view(["GET"])
def pricing_calculate(request):
    try:
        result = pricing.calculate(
            request.query_params.get("institution_type", "school"),
            request.query_params.get("plan", "professional"),
            request.query_params.get("students", 0),
        )
    except (ValueError, TypeError) as exc:
        return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(result)


class LeadInsightsView(APIView):
    """Aggregated, non-PII lead metrics used by the site's insights view."""

    def get(self, request):
        qs = DemoRequest.objects.all()
        by_segment = list(
            qs.values("segment").annotate(count=Count("id")).order_by("segment")
        )
        by_institution = list(
            qs.values("institution_type").annotate(count=Count("id")).order_by("institution_type")
        )
        # Bucket by calendar month in Python — avoids relying on MySQL time
        # zone tables (CONVERT_TZ) which are often absent on local installs.
        buckets = Counter()
        for created in qs.values_list("created_at", flat=True):
            local = timezone.localtime(created) if timezone.is_aware(created) else created
            buckets[local.strftime("%Y-%m")] += 1
        by_month = [
            {"month": month, "count": count} for month, count in sorted(buckets.items())
        ]
        return Response(
            {
                "total": qs.count(),
                "by_segment": by_segment,
                "by_institution": by_institution,
                "by_month": by_month,
            }
        )


@api_view(["GET"])
def health(request):
    return Response({"status": "ok", "service": "encode-campus-api"})
