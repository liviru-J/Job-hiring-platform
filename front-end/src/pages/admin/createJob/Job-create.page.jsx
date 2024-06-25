import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const JobCreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await window.Clerk.session.getToken();

    await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            type: formData.type,
            location: formData.location,
            questions: [formData.q1, formData.q2, formData.q3]
        })
    })
    
    setFormData({
        title: "",
        description: "",
        type: "",
        location: "",
        q1: "",
        q2: "",
        q3: "",
      })
  };

  return (
    <div>
      <div className="py-8">
        <h2>Create A New Job Posting</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <h3>Title</h3>
          <Input
            className="mt-4"
            value={formData.title}
            name="title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="py-4">
          <h3>Description</h3>
          <Textarea
            className="mt-4"
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
        </div>

        <div className="py-4">
          <h3>Type</h3>
          <Input
            className="mt-4"
            value={formData.type}
            name="type"
            onChange={handleChange}
            required
          />
        </div>

        <div className="py-4">
          <h3>Location</h3>
          <Input
            className="mt-4"
            value={formData.location}
            name="location"
            onChange={handleChange}
            required
          />
        </div>

        <div className="py-4">
          <h3>Question 1</h3>
          <Textarea
            className="mt-4"
            value={formData.q1}
            name="q1"
            onChange={handleChange}
            required
          />
        </div>

        <div className="py-4">
          <h3>Question 2</h3>
          <Textarea
            className="mt-4"
            value={formData.q2}
            name="q2"
            onChange={handleChange}
            required
          />
        </div>

        <div className="py-4">
          <h3>Question 3</h3>
          <Textarea
            className="mt-4"
            value={formData.q3}
            name="q3"
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type={"submit"}
          className="mt-4 mb-4 bg-card text-card-foreground text-lg mr-6"
        >
          Submit Post
        </Button>
        <Button
          type="button"
          className="w-fit text-lg"
          onClick={() =>
            setFormData({
              title: "",
              description: "",
              type: "",
              location: "",
              q1: "",
              q2: "",
              q3: "",
            })
          }
          variant="outline"
        >
          Clear
        </Button>
      </form>
    </div>
  );
};

export default JobCreatePage;
