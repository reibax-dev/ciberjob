
export const ofertas = [
  {
    id_ofertas: 1,
    nombre: "Analista SOC Junior",
    id_categoria: 1,
    id_empresa: 1,
    descripcion: "Monitorización de alertas de seguridad y respuesta ante incidentes en entorno 24/7.",
    id_modalidad: 2,
    salario: 28000.00,
    ubicacion: "Madrid",
    fecha: "2026-11-10"
  },
  {
    id_ofertas: 2,
    nombre: "Desarrollador Backend Node.js",
    id_categoria: 2,
    id_empresa: 2,
    descripcion: "Desarrollo de APIs REST con Express, PostgreSQL y contenedores Docker.",
    id_modalidad: 3,
    salario: 36500.50,
    ubicacion: "Bilbao",
    fecha: "2026-11-11"
  },
  {
    id_ofertas: 3,
    nombre: "Pentester / Auditor de Seguridad",
    id_categoria: 1,
    id_empresa: 1,
    descripcion: "Realización de auditorías de caja negra y blanca en aplicaciones web e infraestructura.",
    id_modalidad: 3,
    salario: 42000.00,
    ubicacion: "Barcelona",
    fecha: "2026-11-11"
  },
  {
    id_ofertas: 4,
    nombre: "Administrador de Sistemas Linux",
    id_categoria: 3,
    id_empresa: 2,
    descripcion: "Mantenimiento de servidores Linux, automatización con Bash/Python y despliegue en nube.",
    id_modalidad: 1,
    salario: 32000.00,
    ubicacion: "Valencia",
    fecha: "2026-11-12"
  }
];

export const categorias = [
  {
    id_categoria: 1,
    nombre: "Ciberseguridad",
    descripcion: "Puestos relacionados con seguridad informática, pentesting y defensa de redes."
  },
  {
    id_categoria: 2,
    nombre: "Desarrollo Web",
    descripcion: "Creación y mantenimiento de aplicaciones web frontend, backend y fullstack."
  },
  {
    id_categoria: 3,
    nombre: "Administración de Sistemas",
    descripcion: "Gestión de servidores, redes, cloud y bases de datos."
  }
];

export const modalidades = [
  { id_modalidad: 1, nombre: "Presencial" },
  { id_modalidad: 2, nombre: "Híbrido" },
  { id_modalidad: 3, nombre: "Remoto" }
];

export const usuarios = [
  {
    id_usuario: 1,
    nombre: "Admin Ciberjob",
    contrasenia: "hash_admin_1234",
    email: "admin@ciberjob.com",
    telefono: "600111222",
    admin: true
  },
  {
    id_usuario: 2,
    nombre: "Laura Gómez",
    contrasenia: "hash_empresa_1234",
    email: "rrhh@techsec.es",
    telefono: "611222333",
    admin: false
  },
  {
    id_usuario: 3,
    nombre: "Carlos Ruiz",
    contrasenia: "hash_empresa_5678",
    email: "talento@clouddev.es",
    telefono: "622333444",
    admin: false
  },
  {
    id_usuario: 4,
    nombre: "Ana Martínez",
    contrasenia: "hash_trabajador_1234",
    email: "ana.martinez@email.com",
    telefono: "633444555",
    admin: false
  }
];

export const empresas = [
  { id_empresa: 1, id_usuario: 2, nombre: "TechSec Solutions S.L." },
  { id_empresa: 2, id_usuario: 3, nombre: "CloudDev España" }
];

export const trabajadores = [
  { id_trabajador: 1, id_usuario: 4, cv: "/uploads/cv/ana_martinez_cv.pdf" }
];
 

export {
    ofertas,
    categorias,
    modalidades,
    usuarios,
    empresas
}