import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const JobPage = () => {
  const job = {
    title: "Intern - Software Engineer",
    description:
      "We are seeking a motivated and enthusiastic Software Engineering Intern to join our dynamic team. As a Software Engineering Intern, you will have the opportunity to work closely with experienced developers and contribute to real-world projects. This internship is designed to provide valuable hands-on experience, foster professional growth, and enhance your technical skills.",
    type: "Full-time",
    location: "Remote",
    questions: [
      "Share your academic background and highlight key programming concepts you've mastered. How has your education shaped your current tech skill set ?",
      "Describe your professional development, emphasizing any certifications obtained. How have these certifications enriched your technical abilities, and can you provide an example of their practical application ?",
      "Discuss notable projects in your programming experience. What challenges did you face, and how did you apply your skills to overcome them? Highlight the technologies used and the impact of these projects on your overall growth as a prefessional ?",
    ],
  };

  const [FormData, setFormData] = useState({
    FullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(FormData);
  };
  return (
    <div>
      <div>
        <h2>{job.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job.description}</p>
      </div>

      <Separator />

      <form className="py-8 flex flex-col gap-y-6" onSubmit={handlesubmit}>
        <div className="flex flex-col gap-y-4">
          <Label className="text-lg">Full Name</Label>
          <Input
            required
            value={FormData.FullName}
            onChange={(event) =>
              setFormData({ ...FormData, FullName: event.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label className="text-lg">
            Share your academic background and highlight key programming
            concepts you've mastered. How has your education shaped your current
            tech skill set ?
          </Label>
          <Textarea
            required
            value={FormData.a1}
            onChange={(event) =>
              setFormData({ ...FormData, a1: event.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label className="text-lg">
            Describe your professional development, emphasizing any
            certifications obtained. How have these certifications enriched your
            technical abilities, and can you provide an example of their
            practical application ?
          </Label>
          <Textarea
            required
            value={FormData.a2}
            onChange={(event) =>
              setFormData({ ...FormData, a2: event.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <Label className="text-lg">
            Discuss notable projects in your programming experience. What
            challenges did you face, and how did you apply your skills to
            overcome them? Highlight the technologies used and the impact of
            these projects on your overall growth as a prefessional ?
          </Label>
          <Textarea
            required
            value={FormData.a3}
            onChange={(event) =>
              setFormData({ ...FormData, a3: event.target.value })
            }
          />
        </div>

        <div className="flex gap-x-4 items-center">
          <Button type="submit" className="w-fit">
            Submit
          </Button>
          <Button
            type="button"
            className="w-fit"
            onClick={() =>
              setFormData({
                FullName: "",
                a1: "",
                a2: "",
                a3: "",
              })
            }
            variant="outline"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPage;
