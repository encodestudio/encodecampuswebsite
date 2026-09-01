from rest_framework import serializers

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


class FeatureSerializer(serializers.ModelSerializer):
    pillar_label = serializers.CharField(source="get_pillar_display", read_only=True)

    class Meta:
        model = Feature
        fields = [
            "name",
            "slug",
            "pillar",
            "pillar_label",
            "icon",
            "tagline",
            "problem",
            "solution",
            "capabilities",
            "benefits",
            "seo_title",
            "seo_description",
            "order",
        ]


class SolutionSerializer(serializers.ModelSerializer):
    institution_label = serializers.CharField(
        source="get_institution_type_display", read_only=True
    )

    class Meta:
        model = Solution
        fields = [
            "institution_type",
            "institution_label",
            "title",
            "slug",
            "headline",
            "description",
            "problems",
            "highlights",
            "modules",
            "order",
        ]


class PricingPlanSerializer(serializers.ModelSerializer):
    institution_label = serializers.CharField(
        source="get_institution_type_display", read_only=True
    )

    class Meta:
        model = PricingPlan
        fields = [
            "institution_type",
            "institution_label",
            "name",
            "slug",
            "price_per_student",
            "price_caption",
            "positioning",
            "is_popular",
            "cta_label",
            "features",
            "order",
        ]


class FAQSerializer(serializers.ModelSerializer):
    category_label = serializers.CharField(
        source="get_category_display", read_only=True
    )

    class Meta:
        model = FAQ
        fields = ["question", "answer", "category", "category_label", "order"]


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            "title",
            "slug",
            "category",
            "excerpt",
            "content",
            "author",
            "read_minutes",
            "published_date",
        ]


class DemoRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoRequest
        fields = [
            "id",
            "name",
            "organisation",
            "designation",
            "institution_type",
            "student_strength",
            "city",
            "phone",
            "email",
            "current_system",
            "primary_challenge",
            "message",
            "plan_interest",
            "estimated_monthly",
            "source",
            "segment",
            "created_at",
        ]
        read_only_fields = ["id", "segment", "created_at"]

    def validate_student_strength(self, value):
        if value and value > 5_000_000:
            raise serializers.ValidationError("That student strength looks too large.")
        return value


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "organisation",
            "subject",
            "message",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        obj, _ = NewsletterSubscriber.objects.get_or_create(
            email=validated_data["email"], defaults={"is_active": True}
        )
        if not obj.is_active:
            obj.is_active = True
            obj.save(update_fields=["is_active"])
        return obj
