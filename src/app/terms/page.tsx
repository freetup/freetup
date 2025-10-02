import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-16">
      <div className="space-y-8">
        <div>
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using this service, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Use License</h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily use this service for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title.
            </p>
            <p className="text-muted-foreground">
              Under this license you may not:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to reverse engineer any software contained on the
                service
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on any other server
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. User Accounts</h2>
            <p className="text-muted-foreground">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms.
            </p>
            <p className="text-muted-foreground">
              You are responsible for safeguarding the password that you use to
              access the service and for any activities or actions under your
              password.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Prohibited Uses</h2>
            <p className="text-muted-foreground">
              You may use the service only for lawful purposes and in accordance
              with these Terms. You agree not to use the service:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                In any way that violates any applicable national or
                international law or regulation
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or
                promotional material without our prior written consent
              </li>
              <li>
                To impersonate or attempt to impersonate the Company, a Company
                employee, another user, or any other person or entity
              </li>
              <li>
                To engage in any other conduct that restricts or inhibits
                anyone's use or enjoyment of the service
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The service and its original content, features, and functionality
              are and will remain the exclusive property of the Company and its
              licensors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              In no event shall the Company, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide notice of any changes by
              posting the new Terms on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
