from django.contrib import admin

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


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ("name", "pillar", "order", "is_published")
    list_filter = ("pillar", "is_published")
    search_fields = ("name", "tagline")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ("title", "institution_type", "order")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ("name", "institution_type", "price_per_student", "is_popular", "order")
    list_filter = ("institution_type", "is_popular")


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "category", "order", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("question", "answer")


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "published_date", "is_published")
    list_filter = ("category", "is_published")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(DemoRequest)
class DemoRequestAdmin(admin.ModelAdmin):
    list_display = (
        "organisation",
        "name",
        "institution_type",
        "student_strength",
        "segment",
        "status",
        "created_at",
    )
    list_filter = ("institution_type", "segment", "status", "created_at")
    search_fields = ("organisation", "name", "email", "phone", "city")
    readonly_fields = ("created_at", "updated_at", "segment")
    list_editable = ("status",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_handled", "created_at")
    list_filter = ("is_handled", "created_at")
    search_fields = ("name", "email", "message")
    list_editable = ("is_handled",)


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("email",)


admin.site.site_header = "Encode Campus — Website Admin"
admin.site.site_title = "Encode Campus Admin"
admin.site.index_title = "Marketing site content & leads"
