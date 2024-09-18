// src/app/api/dashboard/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const response = {
    status: "success",
    message: "Request completed successfully",
    data: {
      id: 123,
      name: "Magendran",
      image:"/assets/media/avatars/profilepic.jpg",
      email: "vmagendran@caci.co.uk",
      phone: "+91 9398451030",
      location:"hyderabad",
      status: "Active",
      startdate: "04-12-2024",
      current_project: "BMW Backlog",
      sfia_level: "L2",
      reported_to: "Vandana Voruganti",
      role:"frontend developer",
      access_role: ["admin", "editor"],
      created_at: "2024-09-13T12:34:56Z",
      skills: [
        "Web Design",
        "Code Review",
        "Figma",
        "Product Development",
        "Webflow",
        "AI",
        "noCode",
        "Management"
      ],
      additional_info: {
        discipline: "Development",
        specialism: ".NET",
        employee_type: "Contract",
        location: "India - Hyderabad",
        cost_centre: "800: DS (India)"
      },
      contributors: [
        {
          name: "Karthik",
          contributors: 6,
          image: "/assets/media/avatars/300-3.png"
        },
        {
          name: "Lakshmikanth",
          contributors: 29,
          image: "/assets/media/avatars/300-1.png"
        },
        {
          name: "Leela Krishnan",
          contributors: 34,
          image: "/assets/media/avatars/300-14.png"
        },
        {
          name: "Chandana",
          contributors: 1,
          image: "/assets/media/avatars/300-7.png"
        }
      ],
      projects: {
        current_project: {
          project_name: "BMW Project",
          start_date: "13 August 2024",
          role: "Senior Engineer",
          description: "The first installment of a leadership development series.",
          code: "#leaderdev-1",
          members: [
            {
              name: "Member 1",
              image_url: "assets/media/avatars/300-4.png"
            },
            {
              name: "Member 2",
              image_url: "assets/media/avatars/300-1.png"
            },
            {
              name: "Member 3",
              image_url: "assets/media/avatars/300-2.png"
            },
            {
              name: "Additional Members",
              count: 24,
              placeholder: "+24"
            }
          ]
        },
        previous_projects: [
          {
            project_name: "C&YP Project",
            start_date: "11 January 2022",
            end_date: "12 August 2024",
            role: "E3 Engineer II",
            description: "The first installment of a leadership development series.",
            code: "#leaderdev-1",
            members: [
                {
                  name: "Member 1",
                  image_url: "assets/media/avatars/300-4.png"
                },
                {
                  name: "Member 2",
                  image_url: "assets/media/avatars/300-1.png"
                },
                {
                  name: "Member 3",
                  image_url: "assets/media/avatars/300-2.png"
                },
                {
                  name: "Additional Members",
                  count: 24,
                  placeholder: "+24"
                }
              ]
          }
        ],
        employment_history: {
          company: "CACI",
          joined_date: "11 January 2022"
        }
      }
    }
  };

  return NextResponse.json(response);
}
