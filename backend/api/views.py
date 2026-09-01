from collections import Counter

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


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "form-submit"


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
