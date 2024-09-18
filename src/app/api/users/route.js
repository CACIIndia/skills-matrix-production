// src/app/api/dashboard/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const response = {
    status: "success",
    message: "Request completed successfully",
 
   users :[
      {
        id: 1,
        name: "Magendran V A",
        email: "vmagendran@caci.co.uk",
        status: "In Office",
        statusColor: "green",
        profilePic: "/assets/media/avatars/profilepic.jpg"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      {
        id: 3,
        name: "Karthik Andru",
        email: "karthikandru@caci.co.uk.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg"
      },
      {
        id: 5,
        name: "David Brown",
        email: "david.brown@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg"
      },
      {
        id: 6,
        name: "Karthik Wilson",
        email: "kaethik.wilson@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg"
      },
      {
        id: 7,
        name: "James White",
        email: "james.white@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg"
      },
      {
        id: 8,
        name: "Olivia Martinez",
        email: "olivia.martinez@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg"
      },
      {
        id: 9,
        name: "Matthew Taylor",
        email: "matthew.taylor@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/9.jpg"
      },
      {
        id: 10,
        name: "Karthik Raja",
        email: "isabella.garcia@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/10.jpg"
      },
      {
        id: 11,
        name: "Daniel Thomas",
        email: "daniel.thomas@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/11.jpg"
      },
      {
        id: 12,
        name: "Ava Anderson",
        email: "ava.anderson@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/12.jpg"
      },
      {
        id: 13,
        name: "Henry Lee",
        email: "henry.lee@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/13.jpg"
      },
      {
        id: 14,
        name: "Mia Perez",
        email: "mia.perez@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/14.jpg"
      },
      {
        id: 15,
        name: "William Moore",
        email: "william.moore@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/15.jpg"
      },
      {
        id: 16,
        name: "Ella Jackson",
        email: "ella.jackson@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/16.jpg"
      },
      {
        id: 17,
        name: "Jack Harris",
        email: "jack.harris@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/17.jpg"
      },
      {
        id: 18,
        name: "Amelia Clark",
        email: "amelia.clark@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/18.jpg"
      },
      {
        id: 19,
        name: "Liam Lewis",
        email: "liam.lewis@example.com",
        status: "In Office",
        statusColor: "green",
        profilePic: "https://randomuser.me/api/portraits/men/19.jpg"
      },
      {
        id: 20,
        name: "Charlotte Walker",
        email: "charlotte.walker@example.com",
        status: "On Leave",
        statusColor: "red",
        profilePic: "https://randomuser.me/api/portraits/women/20.jpg"
      }
    ]
    
  };

  return NextResponse.json(response);
}
