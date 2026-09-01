from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("features", views.FeatureViewSet, basename="feature")
router.register("solutions", views.SolutionViewSet, basename="solution")
router.register("blog-posts", views.BlogPostViewSet, basename="blogpost")

urlpatterns = [
    path("", include(router.urls)),
    path("health/", views.health, name="health"),
    path("pricing-plans/", views.PricingPlanListView.as_view(), name="pricing-plans"),
    path("pricing/calculate/", views.pricing_calculate, name="pricing-calculate"),
    path("faqs/", views.FAQListView.as_view(), name="faqs"),
    path("demo-requests/", views.DemoRequestCreateView.as_view(), name="demo-requests"),
    path("contact/", views.ContactMessageCreateView.as_view(), name="contact"),
    path("newsletter/", views.NewsletterSubscribeView.as_view(), name="newsletter"),
    path("insights/leads/", views.LeadInsightsView.as_view(), name="lead-insights"),
]
