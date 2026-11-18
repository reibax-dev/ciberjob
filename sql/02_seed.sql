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

-- Categorías (IDs 1 al 6)
INSERT INTO public.categorias (nombre, descripcion) VALUES
('Minería espacial', 'Extracción de minerales en asteroides, lunas y cinturones orbitales.'),
('Ciberseguridad y netrunning', 'Defensa de redes neuronales corporativas, intrusión ética y contramedidas ICE.'),
('Bioingeniería', 'Cultivos terraformados, implantes orgánicos y diseño genético.'),
('Robótica y androides', 'Mantenimiento, programación y calibración de androides y drones autónomos.'),
('Logística interplanetaria', 'Transporte de carga y pasajeros entre planetas, lunas y estaciones orbitales.'),
('Holomedia y entretenimiento', 'Producción de experiencias holográficas, realidad neural y espectáculos virtuales.');

-- Modalidades (IDs 1 al 4)
INSERT INTO public.modalidades (nombre) VALUES
('Remoto (holográfico)'),
('Orbital (en estación espacial)'),
('Presencial (superficie planetaria)'),
('Híbrido (holograma y presencial)');

-- Usuarios (ID 1: Admin | IDs 2-4 y 9-10: Empresas | IDs 5-8 y 11-12: Trabajadores)
-- Contraseña de todos los usuarios de ejemplo: 1234 (hash bcrypt, 12 rondas)
INSERT INTO public.usuarios (nombre, contrasenia, email, telefono, admin) VALUES
('Admin Sistema', '$2b$12$zsq1D8axG5H0j9RXj9jh0ey8wpUwmXRq.62XrpSlOePhFmU5i8zf2', 'admin@portalempleo.es', '+34 600 000 001', true),
('Laura Gómez', '$2b$12$gzTM01XWykgHBVcLt63FWOzjLn9YLAb.5FRSjGJs98W82rZszIUQu', 'rrhh@astrominera.space', '+34 944 111 222', false),
('Carlos Ruiz', '$2b$12$HEJiHqWQLu936l5MAaC.SOwknf0u24/jUGanNpWEpOSNwNfWMUVRa', 'talento@neonshield.net', '+34 910 333 444', false),
('Elena Martín', '$2b$12$Jw3RhMOv0ABTY2jLfZXiw.9LfqVWWVcXcwoynXkQwBJ99b2LuDJZC', 'empleo@helixbio.mars', '+34 932 555 666', false),
('Javier Pérez', '$2b$12$AWjIDE1vsDl1LaYpYx4CH.uExDy/urf4U.kX6otdHsOAar.icND6W', 'javier.perez@email.com', '+34 611 222 333', false),
('Sofía Navarro', '$2b$12$IbmDCo8OYKtPhgLyqXwlDu4aWbORZSFi4Du/8Eh38A2U8DsQwYPBO', 'sofia.navarro@email.com', '+34 622 333 444', false),
('Miguel Torres', '$2b$12$UJeUAIZAbpxas9IFoDzo3u1UA4.4TXC8TPkJN3fymOwbNmUbs2.2a', 'miguel.torres@email.com', '+34 633 444 555', false),
('Ana Belén Castro', '$2b$12$c.zDZ14XsAsu95w7Mi6jQOGRJYKYl1tHqBuNvS/NRB29fKwTlCLhu', 'ana.castro@email.com', '+34 644 555 666', false),
('Iker Etxeberria', '$2b$12$1.WJ28Zhax87MAtulwCacOb4799xfqXlcYGJOek1t8L90cqzSCaAC', 'flota@kuiperfreight.space', '+34 946 777 888', false),
('Yuki Tanaka', '$2b$12$UAaJNBEMhAgu9gMRBOzrtOqxYcPs/GM0n71wUBQImH/nJcoD1HR0W', 'casting@neondreams.holo', '+34 915 888 999', false),
('Lucía Herrera', '$2b$12$S4SFf2L1QIxXaOvoQBVEU.2uF2s/zzx/0O7k.RHH7fDgejmNJNfRS', 'lucia.herrera@email.com', '+34 655 666 777', false),
('Daniel Ortega', '$2b$12$BEUr1WatEYD2IrPzEEMxU.ybgRIZcPgaOvw.xb7V1BLhS.2RZVhLG', 'daniel.ortega@email.com', '+34 666 777 888', false);

-- Empresas (IDs 1 al 5, asociadas a usuarios 2, 3, 4, 9 y 10)
INSERT INTO  public.empresas(id_usuario, nombre) VALUES
(2, 'AstroMinera Ceres S.L.'),
(3, 'NeonShield Cybersec'),
(4, 'Helix Biogenética Marciana'),
(9, 'Kuiper Freight Lines'),
(10, 'Neon Dreams Holostudio');

-- Trabajadores (IDs 1 al 6, asociados a usuarios 5, 6, 7, 8, 11 y 12)
INSERT INTO public.trabajadores (id_usuario, "cv") VALUES
(5, 'Piloto de minería con 6 años en el cinturón de asteroides. Licencia de exotraje clase B.'),
(6, 'Netrunner certificada. Especialista en contramedidas ICE y auditorías de implantes neuronales.'),
(7, 'Técnico de androides serie N. Calibración de sensores y reparación de servomotores.'),
(8, 'Bioingeniera agrónoma. Cultivos hidropónicos en baja gravedad y suelos marcianos.'),
(11, 'Diseñadora de experiencias holográficas. 4 años creando conciertos en realidad neural.'),
(12, 'Navegante de carguero con 3.000 horas de salto. Certificado de soporte vital en vacío.');

-- Ofertas de empleo (IDs 1 al 33)
-- Empresas: 1 AstroMinera | 2 NeonShield | 3 Helix | 4 Kuiper Freight | 5 Neon Dreams
-- Modalidades: 1 Remoto | 2 Orbital | 3 Presencial | 4 Híbrido
INSERT INTO public.ofertas (nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha) VALUES
('Minero de asteroides', 1, 1, 'Extracción de iridio y platino en asteroides tipo M. Turnos de 3 semanas en órbita.', 2, '68000.00', 'Cinturón de asteroides, Ceres', '2026-10-15'),
('Netrunner de seguridad corporativa', 2, 2, 'Defensa de la red neuronal de la empresa y respuesta a intrusiones en tiempo real.', 1, '72000.00', 'Neo Tokio (holograma)', '2026-10-20'),
('Bioingeniero de cultivos marcianos', 3, 3, 'Diseño de cultivos resistentes a la radiación para los invernaderos de Olympus.', 3, '55000.00', 'Colonia Olympus, Marte', '2026-11-01'),
('Técnico de mantenimiento de androides', 4, 2, 'Reparación y calibración de androides de vigilancia serie N.', 3, '41000.00', 'Neo Tokio, distrito 7', '2026-11-05'),
('Piloto de carguero orbital', 1, 1, 'Transporte de mineral entre Ceres y la estación de refinado Vesta-2.', 2, '61000.00', 'Estación Vesta-2', '2026-11-10'),
('Auditor de implantes neuronales', 2, 3, 'Revisión de firmware de implantes médicos antes de su aprobación.', 1, '58000.00', 'Remoto desde cualquier colonia', '2026-11-12'),
('Programador de drones de terraformación', 4, 3, 'Programación de enjambres de drones que siembran líquenes en Marte.', 3, '49500.00', 'Valles Marineris, Marte', '2026-11-15'),
('Geólogo de cometas', 1, 1, 'Análisis de núcleos de hielo para localizar agua y metales antes de cada perforación.', 2, '64000.00', 'Nube de Oort, base Kuiper-9', '2026-09-28'),
('Operador de taladro gravitacional', 1, 1, 'Manejo de taladros de antimateria en la corteza de asteroides metálicos. Plus de peligrosidad.', 2, '70500.00', 'Asteroide 16 Psyche', '2026-10-02'),
('Supervisor de refinería en microgravedad', 1, 1, 'Control de calidad del mineral fundido en hornos solares y gestión de un equipo de 12 operarios.', 4, '76000.00', 'Estación Vesta-2', '2026-11-20'),
('Cazador de hielo negro', 2, 2, 'Rastreo y neutralización de programas ICE hostiles infiltrados en la red de clientes.', 1, '81000.00', 'Neo Tokio (holograma)', '2026-10-08'),
('Analista de amenazas cuánticas', 2, 2, 'Detección de ataques contra el cifrado cuántico de la banca orbital y diseño de parches.', 4, '88000.00', 'Nueva Madrid, torre Cibeles 3', '2026-11-18'),
('Pentester de cyberdecks', 2, 2, 'Auditoría ofensiva de cyberdecks de consumo antes de su salida al mercado.', 1, '62000.00', 'Remoto desde cualquier colonia', '2026-12-01'),
('Guardaespaldas digital de ejecutivos', 2, 2, 'Protección en tiempo real de los implantes neuronales de directivos durante sus viajes.', 3, '67500.00', 'Neo Tokio, distrito financiero', '2026-12-10'),
('Diseñador genético de mascotas sintéticas', 3, 3, 'Creación de especies de compañía adaptadas a hábitats cerrados y baja gravedad.', 4, '52000.00', 'Colonia Olympus, Marte', '2026-10-25'),
('Cirujano de ciberimplantes', 3, 3, 'Implantación y retirada de prótesis neurales en el quirófano robótico de la colonia.', 3, '95000.00', 'Hospital Tharsis, Marte', '2026-11-08'),
('Técnico de bancos de clonación', 3, 3, 'Mantenimiento de cápsulas de crecimiento celular y control de la cadena de frío criogénica.', 3, '46000.00', 'Laboratorio Hellas, Marte', '2026-12-05'),
('Ingeniero de exoesqueletos de carga', 4, 4, 'Diseño y reparación de exoesqueletos para estibadores de los muelles orbitales.', 2, '58500.00', 'Puerto orbital Lagrange-1', '2026-10-12'),
('Entrenador de IA para androides de servicio', 4, 2, 'Ajuste del comportamiento social de androides de atención al público y revisión de sus registros.', 1, '54000.00', 'Remoto (holográfico)', '2026-11-25'),
('Piloto de salto hiperespacial', 5, 4, 'Navegación de cargueros pesados en rutas de salto entre Marte, Ceres y las lunas de Júpiter.', 2, '92000.00', 'Puerto orbital Lagrange-1', '2026-09-30'),
('Controlador de tráfico orbital', 5, 4, 'Coordinación de atraques y ventanas de lanzamiento en uno de los puertos más transitados del sistema.', 4, '63000.00', 'Torre de control Lagrange-1', '2026-10-18'),
('Estibador de gravedad cero', 5, 4, 'Carga y descarga de contenedores en microgravedad con exoesqueleto. Formación inicial incluida.', 2, '39000.00', 'Muelle 4, estación Europa-Alfa', '2026-11-03'),
('Mecánico de motores de fusión', 5, 4, 'Revisión de reactores de fusión de cargueros entre trayectos. Turnos rotativos de 10 días.', 3, '57000.00', 'Astillero de Ganímedes', '2026-12-12'),
('Coordinador de rutas de suministro lunar', 5, 4, 'Planificación de envíos de oxígeno, agua y repuestos a las bases de la cara oculta de la Luna.', 1, '51000.00', 'Remoto desde Base Artemisa', '2026-12-15'),
('Diseñador de mundos holográficos', 6, 5, 'Creación de escenarios inmersivos para parques de realidad neural y juegos multijugador.', 1, '60000.00', 'Neo Barcelona (holograma)', '2026-10-05'),
('Ídolo virtual (captura de movimiento)', 6, 5, 'Actuación con traje de captura para dar vida a una estrella del pop holográfica en directo.', 4, '73000.00', 'Estudios Neon Dreams, Neo Barcelona', '2026-11-14'),
('Técnico de sonido para conciertos neurales', 6, 5, 'Mezcla de audio y estímulos sensoriales en conciertos que se transmiten directamente al implante.', 3, '48000.00', 'Arena Nebulosa, Neo Barcelona', '2026-11-28'),
('Guionista de sueños interactivos', 6, 5, 'Escritura de historias ramificadas para cápsulas de sueño lúcido. Se valora experiencia en videojuegos.', 1, '45500.00', 'Remoto desde cualquier colonia', '2026-12-08'),
('Buzo de océanos subglaciales', 1, 1, 'Inmersión en el océano bajo el hielo de Europa para tomar muestras minerales y revisar sondas.', 3, '84000.00', 'Base Conamara, Europa', '2026-12-18'),
('Domador de enjambres de nanobots', 4, 3, 'Supervisión de enjambres médicos de nanobots y ajuste de sus rutinas de reparación celular.', 4, '69000.00', 'Hospital Tharsis, Marte', '2026-12-20'),
('Agente de aduanas interplanetarias', 5, 4, 'Inspección de cargamentos y detección de contrabando de implantes en el puerto de Lagrange.', 3, '47500.00', 'Puerto orbital Lagrange-1', '2026-12-22'),
('Moderador de realidades virtuales', 6, 5, 'Vigilancia de los mundos holográficos públicos y expulsión de avatares que rompen las normas.', 1, '38500.00', 'Remoto (holográfico)', '2027-01-08'),
('Instructor de combate en gravedad cero', 2, 2, 'Formación del equipo de seguridad física para abordajes y defensa de estaciones orbitales.', 2, '66000.00', 'Estación Vesta-2', '2027-01-12');

-- Postulaciones (ofertas_trabajadores)
INSERT INTO public.ofertas_trabajadores (id_ofertas, id_trabajador) VALUES
(1, 1), -- Javier (piloto minero) se inscribe en Minero de asteroides
(5, 1), -- Javier (piloto minero) se inscribe en Piloto de carguero orbital
(2, 2), -- Sofía (netrunner) se inscribe en Netrunner de seguridad corporativa
(6, 2), -- Sofía (netrunner) se inscribe en Auditor de implantes neuronales
(4, 3), -- Miguel (androides) se inscribe en Técnico de mantenimiento de androides
(3, 4), -- Ana Belén (bioingeniera) se inscribe en Bioingeniero de cultivos marcianos
(7, 4), -- Ana Belén (bioingeniera) se inscribe en Programador de drones de terraformación
(8, 1), -- Javier (piloto minero) se inscribe en Geólogo de cometas
(9, 1), -- Javier (piloto minero) se inscribe en Operador de taladro gravitacional
(11, 2), -- Sofía (netrunner) se inscribe en Cazador de hielo negro
(12, 2), -- Sofía (netrunner) se inscribe en Analista de amenazas cuánticas
(13, 2), -- Sofía (netrunner) se inscribe en Pentester de cyberdecks
(18, 3), -- Miguel (androides) se inscribe en Ingeniero de exoesqueletos de carga
(19, 3), -- Miguel (androides) se inscribe en Entrenador de IA para androides de servicio
(15, 4), -- Ana Belén (bioingeniera) se inscribe en Diseñador genético de mascotas sintéticas
(25, 5), -- Lucía (holodiseñadora) se inscribe en Diseñador de mundos holográficos
(26, 5), -- Lucía (holodiseñadora) se inscribe en Ídolo virtual (captura de movimiento)
(28, 5), -- Lucía (holodiseñadora) se inscribe en Guionista de sueños interactivos
(20, 6), -- Daniel (navegante) se inscribe en Piloto de salto hiperespacial
(21, 6), -- Daniel (navegante) se inscribe en Controlador de tráfico orbital
(5, 6), -- Daniel (navegante) se inscribe en Piloto de carguero orbital
(31, 6), -- Daniel (navegante) se inscribe en Agente de aduanas interplanetarias
(29, 1), -- Javier (piloto minero) se inscribe en Buzo de océanos subglaciales
(30, 4), -- Ana Belén (bioingeniera) se inscribe en Domador de enjambres de nanobots
(32, 5), -- Lucía (holodiseñadora) se inscribe en Moderador de realidades virtuales
(33, 2); -- Sofía (netrunner) se inscribe en Instructor de combate en gravedad cero

COMMIT;