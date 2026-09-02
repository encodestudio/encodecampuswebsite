from django.core import mail
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from api import pricing
from api.models import ContactMessage, DemoRequest


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

    @override_settings(
        CONTACT_FORM_TO=["shivam@encodestudio.in"],
        CONTACT_FORM_CC=["encodestudio.in@gmail.com"],
        DEFAULT_FROM_EMAIL="web@encodecampus.encodestudio.in",
        CUSTOMER_ACK_FROM="shivam@encodestudio.in",
    )
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
        self.assertEqual(len(mail.outbox), 2)
        sent = mail.outbox[0]
        self.assertEqual(sent.to, ["shivam@encodestudio.in"])
        self.assertEqual(sent.cc, ["encodestudio.in@gmail.com"])
        self.assertEqual(sent.reply_to, ["principal@example.com"])
        self.assertIn("Test School", sent.subject)
        self.assertIn("A Principal", sent.body)
        ack = mail.outbox[1]
        self.assertEqual(ack.from_email, "shivam@encodestudio.in")
        self.assertEqual(ack.to, ["principal@example.com"])
        self.assertIn("demo request", ack.subject)
        self.assertIn("Thanks for requesting", ack.body)

    def test_calculate_endpoint(self):
        res = self.client.get(
            "/api/pricing/calculate/",
            {"institution_type": "coaching", "plan": "core", "students": 200},
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["monthly"], 3000.0)


@override_settings(
    CONTACT_FORM_TO=["shivam@encodestudio.in"],
    CONTACT_FORM_CC=["encodestudio.in@gmail.com"],
    DEFAULT_FROM_EMAIL="web@encodecampus.encodestudio.in",
    CUSTOMER_ACK_FROM="shivam@encodestudio.in",
)
class ContactMessageApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_contact_message_sends_email(self):
        payload = {
            "name": "Interested Admin",
            "email": "admin@example.com",
            "phone": "+91-88888-88888",
            "organisation": "Example School",
            "subject": "Pricing question",
            "message": "Please share implementation details.",
        }

        res = self.client.post("/api/contact/", payload, format="json")

        self.assertEqual(res.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 2)
        sent = mail.outbox[0]
        self.assertEqual(sent.to, ["shivam@encodestudio.in"])
        self.assertEqual(sent.cc, ["encodestudio.in@gmail.com"])
        self.assertEqual(sent.reply_to, ["admin@example.com"])
        self.assertIn("Pricing question", sent.subject)
        self.assertIn("Please share implementation details.", sent.body)
        ack = mail.outbox[1]
        self.assertEqual(ack.from_email, "shivam@encodestudio.in")
        self.assertEqual(ack.to, ["admin@example.com"])
        self.assertIn("received your Encode Campus message", ack.subject)
