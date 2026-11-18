-- =====================================================================
--  Agencia de buscador de empleo ciberjob  — Datos de ejemplo
--
--  Se ejecuta AUTOMÁTICAMENTE después de 01-schema.sql la primera vez
--  que arranca el contenedor de PostgreSQL.
--
--  Para restaurar los datos sin borrar el volumen:
--    docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < init-db/02-seed.sql
--
-- =====================================================================

BEGIN;

TRUNCATE public.ofertas_trabajadores, public.ofertas, public.trabajadores, public.empresas, public.usuarios, public.modalidades, public.categorias  RESTART IDENTITY CASCADE;

-- Categorías (IDs 1 al 4)
INSERT INTO public.categorias (nombre, descripcion) VALUES
('Desarrollo de Software', 'Programación web, móvil, backend, frontend y arquitectura de sistemas.'),
('Diseño UX/UI', 'Diseño de interfaces, experiencia de usuario, prototipado y sistemas de diseño.'),
('Marketing Digital', 'Gestión de campañas SEM/SEO, redes sociales y analítica web.'),
('Ciencia de Datos', 'Análisis de datos, machine learning, inteligencia artificial y BI.');

-- Modalidades (IDs 1 al 3)
INSERT INTO public.modalidades (nombre) VALUES
('Remoto'),
('Híbrido'),
('Presencial');

-- Usuarios (ID 1: Admin | IDs 2-4: Empresas | IDs 5-8: Trabajadores)
-- Contraseña de todos los usuarios de ejemplo: 1234 (hash bcrypt, 12 rondas)
INSERT INTO public.usuarios (nombre, contrasenia, email, telefono, admin) VALUES
('Admin Sistema', '$2b$12$zsq1D8axG5H0j9RXj9jh0ey8wpUwmXRq.62XrpSlOePhFmU5i8zf2', 'admin@portalempleo.es', '+34 600 000 001', true),
('Laura Gómez', '$2b$12$gzTM01XWykgHBVcLt63FWOzjLn9YLAb.5FRSjGJs98W82rZszIUQu', 'rrhh@techbilbao.es', '+34 944 111 222', false),
('Carlos Ruiz', '$2b$12$HEJiHqWQLu936l5MAaC.SOwknf0u24/jUGanNpWEpOSNwNfWMUVRa', 'talento@innovanorte.com', '+34 910 333 444', false),
('Elena Martín', '$2b$12$Jw3RhMOv0ABTY2jLfZXiw.9LfqVWWVcXcwoynXkQwBJ99b2LuDJZC', 'empleo@datavision.es', '+34 932 555 666', false),
('Javier Pérez', '$2b$12$AWjIDE1vsDl1LaYpYx4CH.uExDy/urf4U.kX6otdHsOAar.icND6W', 'javier.perez@email.com', '+34 611 222 333', false),
('Sofía Navarro', '$2b$12$IbmDCo8OYKtPhgLyqXwlDu4aWbORZSFi4Du/8Eh38A2U8DsQwYPBO', 'sofia.navarro@email.com', '+34 622 333 444', false),
('Miguel Torres', '$2b$12$UJeUAIZAbpxas9IFoDzo3u1UA4.4TXC8TPkJN3fymOwbNmUbs2.2a', 'miguel.torres@email.com', '+34 633 444 555', false),
('Ana Belén Castro', '$2b$12$c.zDZ14XsAsu95w7Mi6jQOGRJYKYl1tHqBuNvS/NRB29fKwTlCLhu', 'ana.castro@email.com', '+34 644 555 666', false);

-- Empresas (IDs 1 al 3, asociadas a usuarios 2, 3 y 4)
INSERT INTO  public.empresas(id_usuario, nombre) VALUES
(2, 'TechBilbao Solutions S.L.'),
(3, 'InnovaNorte Digital S.A.'),
(4, 'DataVision Analytics');

-- Trabajadores (IDs 1 al 4, asociados a usuarios 5, 6, 7 y 8)
INSERT INTO public.trabajadores (id_usuario, "cv") VALUES
(5, '/uploads/cv/cv_javier_perez_backend.pdf'),
(6, '/uploads/cv/cv_sofia_navarro_uxui.pdf'),
(7, '/uploads/cv/cv_miguel_torres_data.pdf'),
(8, '/uploads/cv/cv_anabelen_castro_marketing.pdf');

-- Ofertas de empleo (IDs 1 al 5)
INSERT INTO public.ofertas (nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha) VALUES
('Desarrollador Backend PostgreSQL / Python', 1, 1, 'Buscamos desarrollador con experiencia en APIs REST y optimización de consultas SQL.', 2, '38000.00', 'Bilbao, Vizcaya', '2026-10-15'),
('Diseñador Product Designer UX/UI Senior', 2, 2, 'Liderar el diseño de productos digitales y mantener el Design System corporativo.', 1, '35000.00', 'Madrid (100% Teletrabajo)', '2026-10-20'),
('Data Engineer & BI Analyst', 4, 3, 'Construcción de pipelines ETL y cuadros de mando en PowerBI y SQL.', 2, '42000.00', 'Barcelona', '2026-11-01'),
('Especialista SEO y Growth Marketing', 3, 2, 'Estrategia de posicionamiento orgánico y adquisición de tráfico B2B.', 3, '29500.00', 'Madrid', '2026-11-05'),
('Desarrollador Fullstack React + Node.js', 1, 1, 'Desarrollo de nuevas funcionalidades para plataforma SaaS en crecimiento.', 1, '36500.00', 'España (Remoto)', '2026-11-10');

-- Postulaciones (ofertas_trabajadores)
INSERT INTO public.ofertas_trabajadores (id_ofertas, id_trabajador) VALUES
(1, 1), -- Javier (Backend) aplica a Desarrollador Backend
(5, 1), -- Javier (Backend) aplica a Fullstack React + Node
(2, 2), -- Sofía (UX/UI) aplica a Product Designer
(3, 3), -- Miguel (Data) aplica a Data Engineer
(1, 3), -- Miguel (Data) aplica a Desarrollador Backend
(4, 4); -- Ana Belén (Marketing) aplica a Especialista SEO

COMMIT;