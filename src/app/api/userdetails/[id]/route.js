// src/app/api/dashboard/route.ts

import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    const all_users= [
      {
        id: 1,
        name: "Magendran",
        image: "/assets/media/avatars/profilepic.jpg",
        email: "vmagendran@caci.co.uk",
        phone: "+91 9398451030",
        location: "Hyderabad",
        status: "Active",
        startdate: "04-12-2024",
        current_project: "BMW Backlog",
        sfia_level: "L2",
        reported_to: "Vandana Voruganti",
        role: "Frontend Developer",
        access_role: ["admin", "editor"],
        created_at: "2024-09-13T12:34:56Z",
        skills: [
          { name: 'Web Design', level: 3 },   // Expert
          { name: 'Code Review', level: 3 },  // Expert
          { name: 'Figma', level: 1 },        // Novice
          { name: 'Product Development', level: 1 }, // Novice
          { name: 'Webflow', level: 2 },      // Proficient
          { name: 'AI', level: 2 },           // Proficient
          { name: 'noCode', level: 2 },       // Proficient
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
      },
      {
        id: 2,
        name: "Aisha Khan",
        image: "/assets/media/avatars/profilepic2.jpg",
        email: "aisha.khan@caci.co.uk",
        phone: "+91 9123456789",
        location: "Bangalore",
        status: "Active",
        startdate: "01-02-2023",
        current_project: "Tesla Model X",
        sfia_level: "L3",
        reported_to: "Anil Kumar",
        role: "UI Designer",
        access_role: ["editor"],
        created_at: "2024-09-14T08:22:10Z",
        skills: [
          { name: 'Web Design', level: 3 },   // Expert
          { name: 'Code Review', level: 3 },  // Expert
          { name: 'Figma', level: 1 },        // Novice
          { name: 'Product Development', level: 1 }, // Novice
          { name: 'Webflow', level: 2 },      // Proficient
          { name: 'AI', level: 2 },           // Proficient
          { name: 'noCode', level: 2 },       // Proficient
        ],
        additional_info: {
          discipline: "Design",
          specialism: "UI/UX",
          employee_type: "Permanent",
          location: "India - Bangalore",
          cost_centre: "801: DS (Bangalore)"
        },
        contributors: [
          {
            name: "Rajesh",
            contributors: 5,
            image: "/assets/media/avatars/300-5.png"
          },
          {
            name: "Simran",
            contributors: 22,
            image: "/assets/media/avatars/300-2.png"
          }
        ],
        projects: {
          current_project: {
            project_name: "Tesla Model X",
            start_date: "15 March 2024",
            role: "Lead Designer",
            description: "Designing the next-gen user interface for Tesla Model X.",
            code: "#teslamodelx",
            members: [
              {
                name: "Member A",
                image_url: "assets/media/avatars/300-6.png"
              },
              {
                name: "Member B",
                image_url: "assets/media/avatars/300-7.png"
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
              project_name: "SolarCity",
              start_date: "05 August 2022",
              end_date: "28 February 2024",
              role: "UI Designer",
              description: "Designing user interfaces for SolarCity's app.",
              code: "#solarcity",
              members: [
                {
                  name: "Member X",
                  image_url: "assets/media/avatars/300-8.png"
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
            company: "Tech Innovations",
            joined_date: "01 February 2023"
          }
        }
      },
      {
        id: 3,
        name: "Karthik Andru",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        email: "karthikandru@example.com",
        phone: "+91 9123456789",
        location: "Bangalore",
        status: "Active",
        startdate: "01-02-2023",
        current_project: "Tesla Model X",
        sfia_level: "L3",
        reported_to: "Anil Kumar",
        role: "UI Designer",
        access_role: ["editor"],
        created_at: "2024-09-14T08:22:10Z",
        skills: [
          { name: 'Web Design', level: 3 },   // Expert
          { name: 'Code Review', level: 3 },  // Expert
          { name: 'Figma', level: 1 },        // Novice
          { name: 'Product Development', level: 1 }, // Novice
          { name: 'Webflow', level: 2 },      // Proficient
          { name: 'AI', level: 2 },           // Proficient
          { name: 'noCode', level: 2 },       // Proficient
        ],
        additional_info: {
          discipline: "Design",
          specialism: "UI/UX",
          employee_type: "Permanent",
          location: "India - Bangalore",
          cost_centre: "801: DS (Bangalore)"
        },
        contributors: [
          {
            name: "Rajesh",
            contributors: 5,
            image: "/assets/media/avatars/300-5.png"
          },
          {
            name: "Simran",
            contributors: 22,
            image: "/assets/media/avatars/300-2.png"
          }
        ],
        projects: {
          current_project: {
            project_name: "Tesla Model X",
            start_date: "15 March 2024",
            role: "Lead Designer",
            description: "Designing the next-gen user interface for Tesla Model X.",
            code: "#teslamodelx",
            members: [
              {
                name: "Member A",
                image_url: "assets/media/avatars/300-6.png"
              },
              {
                name: "Member B",
                image_url: "assets/media/avatars/300-7.png"
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
              project_name: "SolarCity",
              start_date: "05 August 2022",
              end_date: "28 February 2024",
              role: "UI Designer",
              description: "Designing user interfaces for SolarCity's app.",
              code: "#solarcity",
              members: [
                {
                  name: "Member X",
                  image_url: "assets/media/avatars/300-8.png"
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
            company: "Tech Innovations",
            joined_date: "01 February 2023"
          }
        }
      }
      
    ];

    const userId = parseInt(params.id, 10);  // Parse the id from the request params
    const user = all_users.find((user) => user.id === userId);

    if (user) {
      return NextResponse.json({
        status: "success",
        data: user,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: `User with ID ${userId} not found.`,
      }, { status: 404 });
    }

  return NextResponse.json(response);
}
