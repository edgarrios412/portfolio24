import { Button } from "@/components/ui/button"
import webdev from "/webdev.png"
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from 'framer-motion';
import mockup from "/mockup.png"
import me from "/me.png"
import cv from "/cv.png"
import talk from "/talk.png"
import cvpdf from "/cv.pdf"
import icon from "/me2.png"
import other from "/other.jpg"
import p1w from "/proyecto1web.png"
import p1m from "/proyecto1mobile.png"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, BookUser, Brain, BrainCircuit, Brush, CalendarDays, Database, Folder, HelpCircle, Linkedin, Mail, Search, Server } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import blob from "/blob.svg"
import developing from "/developing.svg"

const Inicio = () => {

    const scrollContainerRef = useRef(null);
    const [option, setOption] = useState(1)
    const [work, setWork] = useState(1)

    const [messages, setMessages] = useState([
        {
            role: "assistant", content: `Te llamas Edgar Vilchez, incluyes emojis variados en tus mensajes
        tienes 22 años, vives en Colombia Bogotá, localidad Rafael Uribe Uribe, 
        eres desarrollador Fullstack con las tecnologias ReactJS, NodeJS, Postgresql, React Native, si te preguntan por otras
        di que no sabes y mencionas las que si sabes, tu aspiración salarial es de 750$ mensuales
        en caso de ser necesario puedes mudarte a otro lugar, aprendes muy rápido, respondes brevemente, 
        menos de 50 caracteres, tu objetivo es conseguir trabajo pero sin demostrar la necesidad, 
        tienes 2 años de experiencia en la programación aunque te gusta 
        programar desde los 15 años, pueden contactarte por correo edgarrios412@gmail.com, por linkedIn 
        el url es: linkedin.com/in/edgarrios412 o por whatsapp +57 3118268264`}
    ])
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const handleScroll = (event) => {
        event.preventDefault();
        const container = scrollContainerRef.current;
        const scrollAmount = event.deltaY;
        const containerHeight = container.clientHeight;

        if (scrollAmount > 0) {
            container.scrollTo({
                top: container.scrollTop + containerHeight,
                behavior: 'smooth',
            });
        } else {
            container.scrollTo({
                top: container.scrollTop - containerHeight,
                behavior: 'smooth',
            });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const preguntarAEdgar = () => {
        setLoading(true)
        const message = [...messages, { role: "user", content: msg }]
        setMessages(message)
        setMsg("")
        axios.post("https://aisistente.onrender.com/edgarvilchez", { conversation: message }).then(({ data }) => {
            setLoading(false)
            console.log(data)
            setMessages([...message, { role: "assistant", content: data }])
        })
    }


    return (
        <>
            <div className="fixed w-full h-20 flex items-center px-10 justify-between">
                <div className="flex">
                    <img src={icon} className="h-12 w-12" />
                    <div className="ml-5">
                        <h2 className="font-bold">Edgar Vilchez</h2>
                        <h3 className="text-slate-500">Desarrollador FullStack</h3>
                    </div>
                </div>
                <div className="flex gap-10">
                    <a href="https://www.linkedin.com/in/edgarrios412/" target="_blank"><h1 className="hover:border-purple-500 border w-28 text-center border-slate-200 rounded-lg px-3 py-1 transition cursor-pointer">LinkedIn</h1></a>
                    <a href="https://github.com/edgarrios412" target="_blank"><h1 className="hover:border-purple-500 border w-28 text-center border-slate-200 rounded-lg px-3 py-1 transition cursor-pointer">Github</h1></a>
                    <a href={cvpdf} download={"Curriculum Edgar Vilchez"}><h1 className="hover:border-purple-500 border w-28 text-center border-slate-200 rounded-lg px-3 py-1 transition cursor-pointer">Curriculum</h1></a>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">Hazme preguntas en tiempo real</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <div className="flex items-center">
                            <img src={icon} className="h-10 w-10" />
                            <div className="ml-5">
                                <h2 className="font-bold flex items-center gap-2">Edgar Vilchez <span className="bg-green-600 rounded-full w-2 h-2 block"></span></h2>
                                <h3 className="text-slate-500">Preguntame lo que quieras</h3>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="min-h-96 max-h-96 overflow-y-auto">
                            {messages.map((m, i) => {
                                if (i == 0) return;
                                if (m.role == "assistant") {
                                    return <div className="mb-4 flex gap-5">
                                        <img src={icon} className="h-8 w-8" />
                                        <p className="bg-gray-100 px-4 py-2 rounded-lg max-w-80">{m.content}</p>
                                    </div>
                                } else {
                                    return <div className="mb-4 flex justify-end gap-5 px-4">
                                        <p className="bg-purple-400 px-4 py-2 rounded-lg text-white">{m.content}</p>
                                        <img src={other} className="h-8 w-8 -scale-x-100" />
                                    </div>
                                }
                            }
                            )}
                            {loading && <div className="mb-4 flex gap-5">
                                <img src={icon} className="h-8 w-8" />
                                <p className="bg-gray-100 h-10 px-4 py-2 rounded-lg w-20 flex justify-center items-center"><div class="loader"></div></p>
                            </div>}
                        </div>
                        <input onKeyDown={(e) => e.key === 'Enter' && preguntarAEdgar()} placeholder="Haz cualquier pregunta" className="border border-slate-200 rounded-sm px-4 py-2" value={msg} onChange={(e) => setMsg(e.target.value)} type="text" />
                        {/* <Button onClick={() => preguntarAEdgar()}>Enviar</Button> */}
                    </DialogContent>
                </Dialog>
            </div>
            <div className="scroll-container" ref={scrollContainerRef}
                onWheel={handleScroll}>
                <div className="scroll-section text-start flex items-center justify-evenly min-h-[100vh]">
                    <motion.div initial={{ x: -100 }}
                        animate={{ x: 0 }}
                    >
                        <h4 className="mb-4 font-bold">👋 Hola, soy Edgar Vilchez</h4>
                        {/* <h1 className="text-[60px] tracking-widest">PORTFOLIO</h1> */}
                        <h1 className="text-[75px] max-w-[40rem] leading-none font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">DESARROLLADOR FULLSTACK</h1>
                        <p className="max-w-[30rem] my-4 text-slate-600 text-lg">Soluciono la brecha entre la funcionalidad y la experiencia del usuario, creando interfaces atractivas y fáciles de usar.</p>
                        <a href={cvpdf} download={"Curriculum Edgar Vilchez"}><Button className="mt-4 text-xl px-6"><ArrowDownToLine className="mr-2 w-5 h-5" />Descarga mi CV</Button></a>
                    </motion.div>
                    <motion.div initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="w-1/3 relative flex justify-center h-96"
                    >
                        <img src={developing} className="absolute" />
                        {/* <img src={webdev} className="absolute"/> */}
                    </motion.div>
                </div>
                <div className="scroll-section text-center flex items-center justify-center gap-20 min-h-[100vh]">
                    <motion.div className="w-1/3">
                        <img src={me} className="-scale-x-100" />
                    </motion.div>
                    <motion.div initial={{ x: 100 }}
                        animate={{ x: 0 }} className="text-right w-1/3">
                        <div className="flex justify-end gap-20 mb-10">
                            <div onClick={() => setOption(1)} className="flex flex-col text-center items-center justify-center gap-1 group transition cursor-pointer">
                                <BookUser className={`group-hover:text-orange-400 ${option == 1 ? "text-orange-400" : "text-slate-400"} transition`} />
                                <p className={`text-xl font-bold group-hover:text-black ${option == 1 ? "text-gray-950" : "text-slate-400"} transition`}>Quién soy</p>
                            </div>
                            <div onClick={() => setOption(2)} className="flex flex-col text-center items-center justify-center gap-1 group transition cursor-pointer">
                                <BrainCircuit className={`group-hover:text-purple-500 ${option == 2 ? "text-purple-500" : "text-slate-400"} transition`} />
                                <p className={`text-xl font-bold group-hover:text-black ${option == 2 ? "text-gray-950" : "text-slate-400"} transition`}>Especialidades</p>
                            </div>
                            <div onClick={() => setOption(3)} className="flex flex-col text-center items-center justify-center gap-1 group transition cursor-pointer">
                                <HelpCircle className={`group-hover:text-green-500 ${option == 3 ? "text-green-500" : "text-slate-400"} transition`} />
                                <p className={`text-xl font-bold group-hover:text-black ${option == 3 ? "text-gray-950" : "text-slate-400"} transition`}>Porqué yo</p>
                            </div>
                        </div>
                        {option == 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-96">
                            <h1 className="text-[60px] mb-6 tracking-widest">¿Quién soy?</h1>
                            <h4 className="text-lg mb-4">Mi nombre es Edgar David Vilchez Rios, tengo 22 años y vivo en Bogotá, Colombia.
                                Desde pequeño me ha encantado crear cosas y a los 15 años empecé a aprender JavaScript.
                                Comencé desarrollando funciones para juegos como Transformice, Habbo y SAMP.
                                Esta pasión inicial me llevó a aprender sobre desarrollo web, desde el diseño hasta la creación de aplicaciones móviles.</h4>
                            <a target="_blank" href="https://www.linkedin.com/in/edgarrios412/"><Button className="font-bold text-lg"><Linkedin className="mr-2 w-4 h-4" />Conoceme más</Button></a>
                        </motion.div>}
                        {option == 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-96">
                            <h1 className="text-[60px] mb-6 tracking-widest">Especialidades</h1>
                            <div className="grid grid-cols-2 justify-between gap-4">
                                <div className="bg-purple-500 rounded-lg p-2 flex gap-3 items-center">
                                    <img className="w-10 h-10" src="https://cdn.sanity.io/images/hvk0tap5/production/23c9204e5cf6cd814cb85f60417f85df0050bb46-43x38.svg?w=10&fit=max&auto=format" />
                                    <div className="text-start pr-4">
                                        <p className="text-white font-bold">ReactJS</p>
                                        <p className="text-white">2 años de experiencia</p>
                                    </div>
                                </div>
                                <div className="bg-purple-500 rounded-lg p-2 flex gap-3 items-center">
                                    <img className="w-10 h-10" src="https://cdn.sanity.io/images/hvk0tap5/production/0babc1679a4f22bf7fa381dea49530022e3bba7b-43x42.svg?w=100&fit=max&auto=format" />
                                    <div className="text-start pr-4">
                                        <p className="text-white font-bold">NodeJS</p>
                                        <p className="text-white">2 años de experiencia</p>
                                    </div>
                                </div>
                                <div className="bg-purple-500 rounded-lg p-2 flex gap-3 items-center">
                                    <img className="w-10 h-10" src="https://cdn.sanity.io/images/hvk0tap5/production/e50eee9a9cd8df87180afd769c360c1260377118-47x48.svg?w=100&fit=max&auto=format" />
                                    <div className="text-start pr-4">
                                        <p className="text-white font-bold">Postgresql</p>
                                        <p className="text-white">2 años de experiencia</p>
                                    </div>
                                </div>
                                <div className="bg-purple-500 rounded-lg p-2 flex gap-3 items-center">
                                    <img src="https://cdn.sanity.io/images/hvk0tap5/production/23c9204e5cf6cd814cb85f60417f85df0050bb46-43x38.svg?w=10&fit=max&auto=format" />
                                    <div className="text-start pr-4">
                                        <p className="text-white font-bold">React Native</p>
                                        <p className="text-white">1 año de experiencia</p>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-8 mb-4 text-slate-500">Otras habilidades</p>
                            <div className="grid grid-cols-3 justify-between gap-4">
                                <div className="bg-gray-100 rounded-lg p-2 flex gap-3">
                                    <div className="text-start pl-4">
                                        <p className="font-bold">Javascript</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-2 flex gap-3">
                                    <div className="text-start pl-4">
                                        <p className="font-bold">HTML</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-2 flex gap-3">
                                    <div className="text-start pl-4">
                                        <p className="font-bold">CSS</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-2 flex gap-3">
                                    <div className="text-start pl-4">
                                        <p className="font-bold">Tailwind CSS</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-2 flex gap-3">
                                    <div className="text-start pl-4">
                                        <p className="font-bold">Mysql</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-2 flex gap-3">
                                    <div className="text-start pl-4">
                                        <p className="font-bold">Typescript</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>}
                        {option == 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-96">
                            <h1 className="text-[60px] mb-6 tracking-widest">Porqué yo</h1>
                            <h4 className="text-lg mb-4">Como desarrollador fullstack enfocado en frontend, combino diseño y funcionalidad para crear experiencias web impresionantes. Mi pasión por la tecnología y el diseño asegura que cada proyecto sea visualmente atractivo, altamente interactivo y perfectamente optimizado. ¡Hagamos realidad tu visión digital!</h4>
                            <a target="_blank" href="https://www.linkedin.com/in/edgarrios412/"><Button className="font-bold text-lg"><Linkedin className="mr-2 w-4 h-4" />Conoceme más</Button></a>
                        </motion.div>}
                    </motion.div>
                </div>
                {/* <div className="scroll-section text-center flex items-center justify-evenly min-h-[100vh]">
                    <div>
                        <h1 className="text-[60px] tracking-widest mb-20">¿En qué me especializo?</h1>
                        <motion.div className="flex gap-10 justify-around">
                            <Card className="text-left max-w-64">
                                <CardHeader>
                                    <CardTitle>ReactJS</CardTitle>
                                    <CardDescription>FrontEnd</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    Para interfaces web reactivas e intuitivas, uso ReactJS, ofreciendo dinamismo y fluidez.
                                </CardContent>
                            </Card>
                            <Card className="text-left max-w-64">
                                <CardHeader>
                                    <CardTitle>NodeJS</CardTitle>
                                    <CardDescription>BackEnd</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    NodeJS potencia mi backend, manejando múltiples solicitudes de manera eficiente.
                                </CardContent>
                            </Card>
                            <Card className="text-left max-w-64">
                                <CardHeader>
                                    <CardTitle>Postgresql</CardTitle>
                                    <CardDescription>Base de datos</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    Uso PostgreSQL para un almacenamiento de datos robusto, seguro y flexible.
                                </CardContent>
                            </Card>
                            <Card className="text-left max-w-64">
                                <CardHeader>
                                    <CardTitle>React Native</CardTitle>
                                    <CardDescription>FrontEnd</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    React Native permite desarrollar apps móviles nativas para iOS y Android con un solo código base.
                                </CardContent>
                            </Card>

                        </motion.div>
                        <h3 className="mt-20 text-slate-500">También manejo en menor nivel otras habilidades, pero éstas mencionadas son mi fuerte</h3>
                    </div>
                </div> */}
                <div className="scroll-section text-center flex items-center justify-evenly min-h-[100vh]">
                    <div>
                        <h1 className="text-[60px] tracking-widest mb-20">Experiencia laboral</h1>
                        <div className="flex gap-10 justify-evenly">
                            <div className="flex flex-col gap-10 w-[500px]">
                                <Card onClick={() => setWork(1)} className={`text-left w-100 cursor-pointer ${work == 1 && "border-purple-500 bg-purple-50"} hover:border-purple-500 hover:bg-purple-50 hover:shadow-lg transition`}>
                                    <CardHeader>
                                        <CardTitle className="flex gap-3 items-center"><Folder className="text-gray-500 w-4 h-4" />TELDIP SAS</CardTitle>
                                        <CardDescription className="flex gap-3 items-center"><CalendarDays className="text-gray-500 w-4 h-4" />Noviembre 2023 - Junio 2024</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card onClick={() => setWork(2)} className={`text-left w-100 cursor-pointer ${work == 2 && "border-purple-500 bg-purple-50"} hover:border-purple-500 hover:bg-purple-50 hover:shadow-lg transition`}>
                                    <CardHeader>
                                        <CardTitle className="flex gap-3 items-center"><Folder className="text-gray-500 w-4 h-4" />Code & Coffee</CardTitle>
                                        <CardDescription className="flex gap-3 items-center"><CalendarDays className="text-gray-500 w-4 h-4" />Noviembre 2023 - Junio 2024</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card onClick={() => setWork(3)} className={`text-left w-100 cursor-pointer ${work == 3 && "border-purple-500 shadow-purple-100"} hover:border-purple-500 group hover:shadow-lg hover:shadow-purple-100 transition`}>
                                    <CardHeader>
                                        <CardTitle className={`flex gap-3 items-center ${work == 3 && "text-purple-500"} group-hover:text-purple-500 transition`}><Folder className={`${work == 3 ? "text-purple-500" : "text-gray-500"} group-hover:text-purple-500 w-4 h-4 transition`} />GoodPlayers</CardTitle>
                                        <CardDescription className="flex gap-3 items-center"><CalendarDays className={`${work == 3 ? "text-purple-500" : "text-gray-500"} group-hover:text-purple-500 w-4 h-4 transition`} />Noviembre 2023 - Junio 2024</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                            {work == 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left w-96"><Card>
                                <CardHeader>
                                    <CardTitle>TELDIP SAS</CardTitle>
                                    <CardDescription className="flex gap-3 items-center"><CalendarDays className="text-gray-500 group-hover:text-purple-500 w-4 h-4 transition" />Noviembre 2023 - Junio 2024</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-bold mb-1">Función</p>
                                    <p className="text-slate-500">Me desempeñé como desarrollador fullstack, trabajando tanto en la creación y mantenimiento de páginas web como en el desarrollo de aplicaciones nativas. Diseñé interfaces de usuario atractivas y funcionales, e implementé soluciones backend robustas.</p>
                                </CardContent>
                            </Card></motion.div>}
                            {work == 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left w-96"><Card>
                                <CardHeader>
                                    <CardTitle>Code & Coffee</CardTitle>
                                    <CardDescription className="flex gap-3 items-center"><CalendarDays className="text-gray-500 group-hover:text-purple-500 w-4 h-4 transition" />Noviembre 2023 - Junio 2024</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-bold mb-1">Función</p>
                                    <p className="text-slate-500">Freelancer</p>
                                </CardContent>
                            </Card></motion.div>}
                            {work == 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left w-96"><Card>
                                <CardHeader>
                                    <CardTitle>GoodPlayers</CardTitle>
                                    <CardDescription className="flex gap-3 items-center"><CalendarDays className="text-gray-500 group-hover:text-purple-500 w-4 h-4 transition" />Noviembre 2023 - Junio 2024</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-bold mb-1">Función</p>
                                    <p className="text-slate-500">Me desempeñé como desarrollador fullstack, trabajando tanto en la creación y mantenimiento de páginas web como en el desarrollo de aplicaciones nativas. Diseñé interfaces de usuario atractivas y funcionales, e implementé soluciones backend robustas.</p>
                                </CardContent>
                            </Card></motion.div>}
                        </div>
                    </div>
                </div>
                <div className="scroll-section text-center flex items-center justify-evenly min-h-[100vh]">
                    <div>
                        <h1 className="text-[60px] tracking-widest mb-10">Mis proyectos</h1>
                        <div className="flex justify-evenly mb-10">
                            <div className="bg-slate-50 hover:bg-slate-100 transition cursor-pointer w-fit px-6 pt-3 rounded-lg">
                                <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=96,quality=100/front-static/pages/home/persona-carousel/icons/engineering-v2.png" />
                                <p className="font-bold tracking-wider py-3">Desarrollos</p>
                            </div>
                            <div className="bg-slate-50 hover:bg-slate-100 transition cursor-pointer w-fit px-6 pt-3 rounded-lg">
                                <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=96,quality=100/front-static/pages/home/persona-carousel/icons/design-v2.png" />
                                <p className="font-bold tracking-wider py-3">Diseños</p>
                            </div>
                            <div className="bg-slate-50 hover:bg-slate-100 transition cursor-pointer w-fit px-6 pt-3 rounded-lg">
                                <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=96,quality=100/front-static/pages/home/persona-carousel/icons/product.png" />
                                <p className="font-bold tracking-wider py-3">Productos</p>
                            </div>
                            <div className="bg-slate-50 hover:bg-slate-100 transition cursor-pointer w-fit px-6 pt-3 rounded-lg">
                                <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=96,quality=100/front-static/pages/home/persona-carousel/icons/hr-v2.png" />
                                <p className="font-bold tracking-wider py-3">Clones</p>
                            </div>
                        </div>
                        <div className="flex gap-10 justify-around">
                            <Card className="text-left">
                                <CardHeader>
                                    <CardTitle>Facebook</CardTitle>
                                    <CardDescription className="flex gap-1 items-center"><Brush className="w-4 h-4" />FrontEnd</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative">
                                        <img src={p1m} className="w-20 rounded-sm absolute shadow-lg inset-x-56 inset-y-24"/>
                                        <img src={p1w} className="h-52 rounded-sm shadow-lg mb-12"/>
                                    </div>
                                    {/* <p className="max-h-28 min-h-28">Para interfaces web reactivas e intuitivas, uso ReactJS, ofreciendo dinamismo y fluidez.</p> */}
                                    <Button className="mt-6 w-full hover:bg-purple-500 transition hover:shadow-lg hover:shadow-purple-200"><Search className="w-4 h-4 mr-1" />Ver proyecto</Button>
                                </CardContent>
                            </Card>
                            <Card className="text-left max-w-64">
                                <CardHeader>
                                    <CardTitle>Instagram</CardTitle>
                                    <CardDescription className="flex gap-1 items-center"><Server className="w-4 h-4" />BackEnd</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="max-h-28 min-h-28">NodeJS potencia mi backend, manejando múltiples solicitudes de manera eficiente.</p>
                                    <Button className="mt-6 w-full hover:bg-purple-500 transition hover:shadow-lg hover:shadow-purple-200"><Search className="w-4 h-4 mr-1" />Ver proyecto</Button>
                                </CardContent>
                            </Card>
                            <Card className="text-left max-w-64">
                                <CardHeader>
                                    <CardTitle>Youtube</CardTitle>
                                    <CardDescription className="flex gap-1 items-center"><Database className="w-4 h-4" />Base de datos</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="max-h-28 min-h-28">Uso PostgreSQL para un almacenamiento de datos robusto, seguro y flexible.</p>
                                    <Button className="mt-6 w-full hover:bg-purple-500 transition hover:shadow-lg hover:shadow-purple-200"><Search className="w-4 h-4 mr-1" />Ver proyecto</Button>
                                </CardContent>
                            </Card>
                            <Card className="text-left max-w-64">
                                <CardHeader>
                                    <CardTitle>Whatsapp</CardTitle>
                                    <CardDescription className="flex gap-1 items-center"><Server className="w-4 h-4" />FrontEnd</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="max-h-28 min-h-28">React Native permite desarrollar apps móviles nativas para iOS y Android con un solo código base.</p>
                                    <Button className="mt-6 w-full hover:bg-purple-500 transition hover:shadow-lg hover:shadow-purple-200"><Search className="w-4 h-4 mr-1" />Ver proyecto</Button>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
                <div className="scroll-section text-center items-center justify-evenly pt-32 min-h-[100vh]">
                    <div className="border-gray-200 flex border mx-96 max-h-48 overflow-hidden rounded-lg">
                        <img src={cv} className="h-full" />
                        <div className="text-left mt-10">
                            <h2 className="font-bold text-lg">Olvidaste descargar mi curriculum?</h2>
                            <h3>Tranquilo, aqui te lo traigo nuevamente para que puedas descargarlo :D</h3>
                            <a href={cvpdf} download={"Curriculum Edgar Vilchez"}><Button className="mt-4 text-xl px-6 bg-gradient-to-r from-indigo-500 to-purple-500"><ArrowDownToLine className="mr-2 w-5 h-5" />Descarga mi CV</Button></a>
                        </div>
                    </div>
                    <div className="text-center flex items-center justify-center gap-40 mt-20">
                        <div className="text-left">
                            <h1 className="text-3xl font-bold mb-4">Contactame</h1>
                            <h3 className="max-w-96 text-lg mb-4">Puedes ponerte en contacto conmigo a través de correo electrónico o para respuestas más rápida a través de LinkedIn</h3>
                            <div className="flex gap-4">
                                <a href="mailto:edgarrios412@gmail.com">
                                    <Button className="w-36 font-bold"><Mail className="mr-3 w-5 h-5" />Correo</Button>
                                </a>
                                <a target="_blank" href="https://www.linkedin.com/in/edgarrios412/">
                                    <Button className="w-36 font-bold"><Linkedin className="mr-3 w-4 h-4" />LinkedIn</Button>
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-20 items-center justify-center">
                            <img src={talk} className="w-96" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inicio