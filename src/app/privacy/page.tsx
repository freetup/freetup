import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground">
              We collect several different types of information for various
              purposes to provide and improve our service to you.
            </p>

            <h3 className="text-xl font-medium">Personal Data</h3>
            <p className="text-muted-foreground">
              While using our service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you. This may include, but is not limited to:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Cookies and usage data</li>
            </ul>

            <h3 className="text-xl font-medium">Usage Data</h3>
            <p className="text-muted-foreground">
              We may also collect information about how the service is accessed
              and used. This usage data may include information such as your
              computer's Internet Protocol address, browser type, browser
              version, the pages you visit, the time and date of your visit, and
              other diagnostic data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use the collected data for various purposes:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>
                To allow you to participate in interactive features when you
                choose to do so
              </li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information so that we can
                improve our service
              </li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              3. Data Storage and Security
            </h2>
            <p className="text-muted-foreground">
              The security of your data is important to us. We strive to use
              commercially acceptable means to protect your personal
              information, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We may employ third-party companies and individuals to facilitate
              our service, provide the service on our behalf, perform
              service-related services, or assist us in analyzing how our
              service is used.
            </p>
            <p className="text-muted-foreground">
              These third parties have access to your personal data only to
              perform these tasks on our behalf and are obligated not to
              disclose or use it for any other purpose.
            </p>

            <h3 className="text-xl font-medium">Social Login Providers</h3>
            <p className="text-muted-foreground">
              We use third-party authentication services including:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Google OAuth</li>
              <li>Apple Sign In</li>
              <li>Facebook Login</li>
            </ul>
            <p className="text-muted-foreground">
              When you use these services, you are also subject to their
              respective privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. Cookies are files
              with small amounts of data which may include an anonymous unique
              identifier.
            </p>
            <p className="text-muted-foreground">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              6. Your Data Protection Rights
            </h2>
            <p className="text-muted-foreground">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong>The right to access</strong> – You have the right to
                request copies of your personal data
              </li>
              <li>
                <strong>The right to rectification</strong> – You have the right
                to request that we correct any information you believe is
                inaccurate
              </li>
              <li>
                <strong>The right to erasure</strong> – You have the right to
                request that we erase your personal data, under certain
                conditions
              </li>
              <li>
                <strong>The right to restrict processing</strong> – You have the
                right to request that we restrict the processing of your
                personal data, under certain conditions
              </li>
              <li>
                <strong>The right to data portability</strong> – You have the
                right to request that we transfer the data that we have
                collected to another organization, or directly to you, under
                certain conditions
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
