from django.core.validators import MinValueValidator
from django.db import models


class InstitutionType(models.TextChoices):
    SCHOOL = "school", "School"
    COLLEGE = "college", "College & University"
    COACHING = "coaching", "Coaching Centre"
    GROUP = "group", "Education Group / Multi-Campus"


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# ---------------------------------------------------------------------------
# Marketing content (served read-only to the React site)
# ---------------------------------------------------------------------------
class Feature(TimeStampedModel):
    """A platform module / feature (Student Management, Fees, Attendance ...)."""

    PILLARS = [
        ("people", "People"),
        ("academics", "Academics"),
        ("administration", "Administration"),
        ("finance", "Finance"),
        ("operations", "Operations"),
        ("communication", "Communication"),
        ("governance", "Governance & Intelligence"),
    ]

    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    pillar = models.CharField(max_length=20, choices=PILLARS)
    icon = models.CharField(max_length=40, default="grid", help_text="Icon key used by the frontend")
    tagline = models.CharField(max_length=200)
    problem = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    capabilities = models.JSONField(default=list, help_text="List of capability strings")
    benefits = models.JSONField(default=list, help_text="List of outcome strings")
    seo_title = models.CharField(max_length=160, blank=True)
    seo_description = models.CharField(max_length=320, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Solution(TimeStampedModel):
    """An institution-type landing page (Schools, Colleges, Coaching, Groups)."""

    institution_type = models.CharField(
        max_length=20, choices=InstitutionType.choices, unique=True
    )
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    headline = models.CharField(max_length=200)
    description = models.TextField()
    problems = models.JSONField(default=list)
    highlights = models.JSONField(default=list)
    modules = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class PricingPlan(TimeStampedModel):
    institution_type = models.CharField(
        max_length=20, choices=InstitutionType.choices
    )
    name = models.CharField(max_length=40)  # Core / Professional / Enterprise
    slug = models.SlugField(max_length=60)
    price_per_student = models.DecimalField(max_digits=7, decimal_places=2)
    price_caption = models.CharField(
        max_length=60, default="per active student / month"
    )
    positioning = models.CharField(max_length=120, blank=True)
    is_popular = models.BooleanField(default=False)
    cta_label = models.CharField(max_length=40, default="Book a Demo")
    features = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["institution_type", "order"]
        unique_together = ("institution_type", "slug")

    def __str__(self):
        return f"{self.get_institution_type_display()} · {self.name}"


class FAQ(TimeStampedModel):
    CATEGORIES = [
        ("product", "Product"),
        ("data", "Data"),
        ("pricing", "Pricing"),
        ("operations", "Operations"),
        ("enterprise", "Enterprise"),
    ]
    question = models.CharField(max_length=240)
    answer = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORIES, default="product")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


class BlogPost(TimeStampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    category = models.CharField(max_length=60, default="Guides")
    excerpt = models.TextField()
    content = models.TextField(blank=True)
    author = models.CharField(max_length=80, default="Encode Campus")
    read_minutes = models.PositiveIntegerField(default=5)
    published_date = models.DateField()
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["-published_date"]

    def __str__(self):
        return self.title


# ---------------------------------------------------------------------------
# Lead capture (written by the public site)
# ---------------------------------------------------------------------------
class DemoRequest(TimeStampedModel):
    STATUS = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("qualified", "Qualified"),
        ("demo_scheduled", "Demo scheduled"),
        ("closed", "Closed"),
    ]
    SEGMENT = [
        ("smb", "SMB"),
        ("mid_market", "Mid-market"),
        ("high_value", "High value"),
    ]

    name = models.CharField(max_length=120)
    organisation = models.CharField(max_length=160)
    designation = models.CharField(max_length=120, blank=True)
    institution_type = models.CharField(
        max_length=20, choices=InstitutionType.choices, default=InstitutionType.SCHOOL
    )
    student_strength = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0)]
    )
    city = models.CharField(max_length=120, blank=True)
    phone = models.CharField(max_length=32)
    email = models.EmailField()
    current_system = models.CharField(max_length=160, blank=True)
    primary_challenge = models.CharField(max_length=200, blank=True)
    message = models.TextField(blank=True)
    plan_interest = models.CharField(max_length=40, blank=True)
    estimated_monthly = models.DecimalField(
        max_digits=12, decimal_places=2, null=True, blank=True
    )
    source = models.CharField(max_length=80, default="website")
    segment = models.CharField(max_length=20, choices=SEGMENT, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default="new")

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Demo request"

    def __str__(self):
        return f"{self.organisation} — {self.name}"

    def derive_segment(self):
        strength = self.student_strength or 0
        if self.institution_type == InstitutionType.GROUP or strength >= 2500:
            return "high_value"
        if strength >= 500:
            return "mid_market"
        return "smb"

    def save(self, *args, **kwargs):
        if not self.segment:
            self.segment = self.derive_segment()
        super().save(*args, **kwargs)


class ContactMessage(TimeStampedModel):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    organisation = models.CharField(max_length=160, blank=True)
    subject = models.CharField(max_length=160, blank=True)
    message = models.TextField()
    is_handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}>"


class NewsletterSubscriber(TimeStampedModel):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.email
