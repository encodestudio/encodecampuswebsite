from django.test import TestCase
from rest_framework.test import APIClient

from api import pricing
from api.models import DemoRequest


class PricingCalcTests(TestCase):
    def test_minimum_applied_for_small_school(self):
        result = pricing.calculate("school", "professional", 80)
        self.assertEqual(result["raw_monthly"], 2000.0)
        self.assertEqual(result["monthly"], 3000.0)
        self.assertTrue(result["minimum_applied"])

    def test_standard_school_professional(self):
        result = pricing.calculate("school", "professional", 1000)
        self.assertEqual(result["monthly"], 25000.0)
        self.assertEqual(result["yearly"], 300000.0)
        self.assertFalse(result["minimum_applied"])

    def test_unknown_plan_raises(self):
        with self.assertRaises(ValueError):
            pricing.calculate("school", "ultra", 100)


class DemoRequestApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_demo_request_and_segment(self):
        payload = {
            "name": "A Principal",
            "organisation": "Test School",
            "designation": "Principal",
            "institution_type": "school",
            "student_strength": 3000,
            "city": "Pune",
            "phone": "+91-99999-99999",
            "email": "principal@example.com",
        }
        res = self.client.post("/api/demo-requests/", payload, format="json")
        self.assertEqual(res.status_code, 201)
        obj = DemoRequest.objects.get()
        self.assertEqual(obj.segment, "high_value")

    def test_calculate_endpoint(self):
        res = self.client.get(
            "/api/pricing/calculate/",
            {"institution_type": "coaching", "plan": "core", "students": 200},
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["monthly"], 3000.0)
