import { ContactForm } from "@/components/contactForm";

const ContactPage: React.FC = () => {
  return (
    <section className="pt-14 p-4 w-full">
      <h1 className="text-2xl text-gray-700 font-bold my-4">تکمیل اطلاعات</h1>
      <ContactForm />
    </section>
  );
};
export default ContactPage;
