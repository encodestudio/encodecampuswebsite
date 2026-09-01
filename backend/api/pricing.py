"""Pricing-calculator logic shared by the API and the seed data.

Mirrors the pricing model in the Encode Campus website blueprint:
subscription is billed on active students / learners, with a monthly minimum.
"""

from decimal import Decimal

MIN_MONTHLY = Decimal("3000")

# price per active student / learner / month
PRICE_TABLE = {
    "school": {"core": Decimal("15"), "professional": Decimal("25"), "enterprise": Decimal("40")},
    "college": {"core": Decimal("20"), "professional": Decimal("35"), "enterprise": Decimal("55")},
    "coaching": {"core": Decimal("10"), "professional": Decimal("18"), "enterprise": Decimal("30")},
    # education groups are quoted on the enterprise higher-ed style band
    "group": {"core": Decimal("20"), "professional": Decimal("35"), "enterprise": Decimal("55")},
}

PLAN_ALIASES = {"pro": "professional", "ent": "enterprise"}


def calculate(institution_type: str, plan: str, students: int):
    institution_type = (institution_type or "school").lower()
    plan = PLAN_ALIASES.get((plan or "professional").lower(), (plan or "professional").lower())

    if institution_type not in PRICE_TABLE:
        raise ValueError("Unknown institution_type")
    if plan not in PRICE_TABLE[institution_type]:
        raise ValueError("Unknown plan")

    students = max(int(students or 0), 0)
    unit_price = PRICE_TABLE[institution_type][plan]
    raw_monthly = unit_price * students
    monthly = max(raw_monthly, MIN_MONTHLY) if students > 0 else MIN_MONTHLY
    minimum_applied = students > 0 and raw_monthly < MIN_MONTHLY

    return {
        "institution_type": institution_type,
        "plan": plan,
        "students": students,
        "unit_price": float(unit_price),
        "raw_monthly": float(raw_monthly),
        "monthly": float(monthly),
        "yearly": float(monthly * 12),
        "minimum_monthly": float(MIN_MONTHLY),
        "minimum_applied": minimum_applied,
        "currency": "INR",
        "gst_note": "Prices shown before applicable GST.",
    }
