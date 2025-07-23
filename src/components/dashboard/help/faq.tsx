import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function FAQ() {
  return (
    <Card className="mb-10">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>How do I export my resume to PDF?</AccordionTrigger>
            <AccordionContent>
              {`Go to "My Resumes", select your resume, click the "Download / Print" button at the top
              right, and choose the destination: "Save as PDF". You can also print the PDF by
              selecting a printer instead.`}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>Can I customize the fonts and colors?</AccordionTrigger>
            <AccordionContent>
              {`Each template supports customization of colors and layout from the create resume form.
              You can choose from various themes and layouts to match your style. Fonts are
              currently not customizable.`}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger>Is StyledResume free to use?</AccordionTrigger>
            <AccordionContent>
              {`StyledResume is currently entirely free to use. You can create, edit, and download as
              many resumes as you want.`}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger>How do I contact support?</AccordionTrigger>
            <AccordionContent>
              {`Scroll down and submit the contact form. We will aim to respond to your query as soon
              as possible.`}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
