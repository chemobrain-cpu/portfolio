import { AiOutlineHome, AiOutlineCalculator, AiOutlineSetting, AiOutlineShareAlt } from "react-icons/ai"
import { RiUserLine } from "react-icons/ri"
import { FaRegLightbulb, FaFacebookF, FaTwitter, FaInstagram, FaDribbble, FaShippingFast } from "react-icons/fa"
import { CgCardClubs } from "react-icons/cg"
import { TbMailOpened } from "react-icons/tb"
import { GoMail } from "react-icons/go"
import { GiChart } from "react-icons/gi"
import { FiLayers } from "react-icons/fi"
import { BsPhone } from "react-icons/bs"
import { BsPhoneVibrate, BsVectorPen } from "react-icons/bs"
import { MdShareLocation, MdLocalShipping, MdOutlineLocalShipping } from "react-icons/md"

export const menu = [
  {
    id: 1,
    text: "home",
    url: "/",
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    text: "resume",
    url: "/resume",
    icon: <RiUserLine />,
  },
  {
    id: 3,
    text: "portfolio",
    url: "/portfolio",
    icon: <FaRegLightbulb />,
  },
  
]

export const socialIcon = [
  {
    id: 1,
    icon: <FaFacebookF />,
    class: "facebook",
  },
  {
    id: 2,
    icon: <FaTwitter />,
    class: "twitter",
  },
  
]

export const side = [
  {
    id: 1,
    num: 75,
    text: "Backend Development",
    class: "skill1",
  },
  {
    id: 2,
    num: 75,
    text: "Frontend Development",
    class: "skill2",
  },
  {
    id: 3,
    num: 75,
    text: "App Development",
    class: "skill3",
  },
]

export const skill = [
  {
    id: 1,
    num: 60,
    text: "Html",
    class: "skill1",
  },
  {
    id: 2,
    num: 60,
    text: "Css3",
    class: "skill2",
  },
  {
    id: 3,
    num: 60,
    text: "Scss",
    class: "skill3",
  },
  {
    id: 1,
    num: 70,
    text: "Javascript(Esnext)",
    class: "skill1",
  },
  {
    id: 3,
    num: 40,
    text: "Typescript",
    class: "skill3",
  },
  {
    id: 2,
    num: 55,
    text: "React",
    class: "skill2",
  },
  {
    id: 3,
    num: 60,
    text: "Express",
    class: "skill3",
  },
  {
    id: 3,
    num: 50,
    text: "Mongoose",
    class: "skill3",
  },
  {
    id: 3,
    num: 60,
    text: "React Native",
    class: "skill3",
  },
  {
    id: 3,
    num: 50,
    text: "Algorithm",
    class: "skill3",
  },
  {
    id: 3,
    num: 50,
    text: "Git/github",
    class: "skill3",
  },
]

export const projects = [
  {
    images:"./images/coinbase_1.png",
  },
  {
    images:"./images/coinbase_2.png",
  },
  {
    images:"./images/coinbase_3.png",
  },
  {
    images:"./images/coinbase_4.png",
  },
  {
    images:"./images/coinbase_5.png",
  },
  {
    images:"./images/coinbase_6.png",
  },
  {
    images:"./images/coinbase_7.png",
  },
  {
    images:"./images/coinbase_8.png",
  },
]

export const projects_2 = [
  {
    images:"./images/coinbase_web1.png",
  },
  {
    images:"./images/coinbase_web2.png",
  },
  {
    images:"./images/coinbase_web3.png",
  },
  {
    images:"./images/coinbase_web4.png",
  },
  {
    images:"./images/coinbase_web5.png",
  },
  {
    images:"./images/coinbase_web6.png",
  },
  {
    images:"./images/coinbase_web7.png",
  },
  {
    images:"./images/coinbase_web8.png",
  },
  {
    images:"./images/coinbase_web9.png",
  },
]




export const about = [
  {
    deatils: [
      {
        text: "My Name",
        value: "Arierhi Precious",
        icon: <RiUserLine />,
      },
      { text: "My Age", value: "25 Years 333 Days", icon: <AiOutlineCalculator /> },
      { text: "Email Address", value: "arierhiprecious@gmail.com", icon: <GoMail /> },
      { text: "Phone Number", value: "+2349071991647", icon: <BsPhoneVibrate /> },
      { text: "Address", value: "Warri,Delta state.", icon: <MdShareLocation /> },
    ],
    bio: [
      {
        para1: "My name is Arierhi Precious,I'm a Jr software developer at Eazyconnect. ",
        para2: "I work at a startup called EazyConnect.My role at Eazytech includes building mobile and web applications for client,building applications that solves societal problems.",
        para3: "My recent achievement include cloning a crypto trading app called Coinbase. i would like to own a Robotics firm few years from now",
        images: "./images/bio.png",
      },
    ],

    serives: [
      {
        id: 1,
        icon: <AiOutlineSetting />,
        title: "Web Development",
        text: "from scratch",
        decs: "i build scalable website and web application to meet your business needs",
      },
      {
        id: 2,
        icon: <BsPhone />,
        title: "Mobile Development",
        text: "stand alone",
        decs: "I build cross platform mobile application to solve your business needs",
      }
    ],

    review: [
      {
        id: 1,
        desc: "Amazing product i will say. He delivered a product that automate accounting and marketing in my small business. ",
        name: "Lady Thanat",
        link: "ll",
        cover: "./images/aut1.jpg",
      },
     
    ],

    price: [
      {
        id: 1,
        icon: <MdOutlineLocalShipping />,
        title: "WEBSITE/WEB APPLICATION",
        desc: "Suitable for small business owners.",
        pri: "200.00",
      },
      {
        id: 2,
        icon: <MdLocalShipping />,
        title: "ANDROID/IOS APP",
        desc: "Suitable for small business or Organizations.",
        pri: "700",
      },
      {
        id: 3,
        icon: <FaShippingFast />,
        title: "Enterprise Website/application",
        desc: "Suitable for big Organizations.",
        pri: "1000",
      },
    ],
  },
]
