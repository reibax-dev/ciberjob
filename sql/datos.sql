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
INSERT INTO public.usuarios (nombre, contrasenia, email, telefono, admin) VALUES
('Admin Sistema', '$2b$12$eImiTXuWVxfM37uY4JANjQ==', 'admin@portalempleo.es', '+34 600 000 001', true),
('Laura Gómez', '$2b$12$KIX9s8d7f6g5h4j3k2l1zO==', 'rrhh@techbilbao.es', '+34 944 111 222', false),
('Carlos Ruiz', '$2b$12$MNB8v7c6x5z4a3s2d1f0gH==', 'talento@innovanorte.com', '+34 910 333 444', false),
('Elena Martín', '$2b$12$QWE1r2t3y4u5i6o7p8a9sD==', 'empleo@datavision.es', '+34 932 555 666', false),
('Javier Pérez', '$2b$12$ZXC9v8b7n6m5l4k3j2h1gF==', 'javier.perez@email.com', '+34 611 222 333', false),
('Sofía Navarro', '$2b$12$ASD4f5g6h7j8k9l0z1x2cV==', 'sofia.navarro@email.com', '+34 622 333 444', false),
('Miguel Torres', '$2b$12$RTY7u8i9o0p1a2s3d4f5gH==', 'miguel.torres@email.com', '+34 633 444 555', false),
('Ana Belén Castro', '$2b$12$UIO3p4a5s6d7f8g9h0j1kL==', 'ana.castro@email.com', '+34 644 555 666', false);

-- Empresas (IDs 1 al 3, asociadas a usuarios 2, 3 y 4)
INSERT INTO public.empresa (id_usuario, nombre) VALUES
(2, 'TechBilbao Solutions S.L.'),
(3, 'InnovaNorte Digital S.A.'),
(4, 'DataVision Analytics');

-- Trabajadores (IDs 1 al 4, asociados a usuarios 5, 6, 7 y 8)
INSERT INTO public.tabajadores (id_usuario, "cv ") VALUES
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