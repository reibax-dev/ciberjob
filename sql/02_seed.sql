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
('Minería espacial', 'Extracción de minerales en asteroides, lunas y cinturones orbitales.'),
('Ciberseguridad y netrunning', 'Defensa de redes neuronales corporativas, intrusión ética y contramedidas ICE.'),
('Bioingeniería', 'Cultivos terraformados, implantes orgánicos y diseño genético.'),
('Robótica y androides', 'Mantenimiento, programación y calibración de androides y drones autónomos.');

-- Modalidades (IDs 1 al 3)
INSERT INTO public.modalidades (nombre) VALUES
('Remoto (holográfico)'),
('Orbital (en estación espacial)'),
('Presencial (superficie planetaria)');

-- Usuarios (ID 1: Admin | IDs 2-4: Empresas | IDs 5-8: Trabajadores)
-- Contraseña de todos los usuarios de ejemplo: 1234 (hash bcrypt, 12 rondas)
INSERT INTO public.usuarios (nombre, contrasenia, email, telefono, admin) VALUES
('Admin Sistema', '$2b$12$zsq1D8axG5H0j9RXj9jh0ey8wpUwmXRq.62XrpSlOePhFmU5i8zf2', 'admin@portalempleo.es', '+34 600 000 001', true),
('Laura Gómez', '$2b$12$gzTM01XWykgHBVcLt63FWOzjLn9YLAb.5FRSjGJs98W82rZszIUQu', 'rrhh@astrominera.space', '+34 944 111 222', false),
('Carlos Ruiz', '$2b$12$HEJiHqWQLu936l5MAaC.SOwknf0u24/jUGanNpWEpOSNwNfWMUVRa', 'talento@neonshield.net', '+34 910 333 444', false),
('Elena Martín', '$2b$12$Jw3RhMOv0ABTY2jLfZXiw.9LfqVWWVcXcwoynXkQwBJ99b2LuDJZC', 'empleo@helixbio.mars', '+34 932 555 666', false),
('Javier Pérez', '$2b$12$AWjIDE1vsDl1LaYpYx4CH.uExDy/urf4U.kX6otdHsOAar.icND6W', 'javier.perez@email.com', '+34 611 222 333', false),
('Sofía Navarro', '$2b$12$IbmDCo8OYKtPhgLyqXwlDu4aWbORZSFi4Du/8Eh38A2U8DsQwYPBO', 'sofia.navarro@email.com', '+34 622 333 444', false),
('Miguel Torres', '$2b$12$UJeUAIZAbpxas9IFoDzo3u1UA4.4TXC8TPkJN3fymOwbNmUbs2.2a', 'miguel.torres@email.com', '+34 633 444 555', false),
('Ana Belén Castro', '$2b$12$c.zDZ14XsAsu95w7Mi6jQOGRJYKYl1tHqBuNvS/NRB29fKwTlCLhu', 'ana.castro@email.com', '+34 644 555 666', false);

-- Empresas (IDs 1 al 3, asociadas a usuarios 2, 3 y 4)
INSERT INTO  public.empresas(id_usuario, nombre) VALUES
(2, 'AstroMinera Ceres S.L.'),
(3, 'NeonShield Cybersec'),
(4, 'Helix Biogenética Marciana');

-- Trabajadores (IDs 1 al 4, asociados a usuarios 5, 6, 7 y 8)
INSERT INTO public.trabajadores (id_usuario, "cv") VALUES
(5, 'Piloto de minería con 6 años en el cinturón de asteroides. Licencia de exotraje clase B.'),
(6, 'Netrunner certificada. Especialista en contramedidas ICE y auditorías de implantes neuronales.'),
(7, 'Técnico de androides serie N. Calibración de sensores y reparación de servomotores.'),
(8, 'Bioingeniera agrónoma. Cultivos hidropónicos en baja gravedad y suelos marcianos.');

-- Ofertas de empleo (IDs 1 al 7)
INSERT INTO public.ofertas (nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha) VALUES
('Minero de asteroides', 1, 1, 'Extracción de iridio y platino en asteroides tipo M. Turnos de 3 semanas en órbita.', 2, '68000.00', 'Cinturón de asteroides, Ceres', '2026-10-15'),
('Netrunner de seguridad corporativa', 2, 2, 'Defensa de la red neuronal de la empresa y respuesta a intrusiones en tiempo real.', 1, '72000.00', 'Neo Tokio (holograma)', '2026-10-20'),
('Bioingeniero de cultivos marcianos', 3, 3, 'Diseño de cultivos resistentes a la radiación para los invernaderos de Olympus.', 3, '55000.00', 'Colonia Olympus, Marte', '2026-11-01'),
('Técnico de mantenimiento de androides', 4, 2, 'Reparación y calibración de androides de vigilancia serie N.', 3, '41000.00', 'Neo Tokio, distrito 7', '2026-11-05'),
('Piloto de carguero orbital', 1, 1, 'Transporte de mineral entre Ceres y la estación de refinado Vesta-2.', 2, '61000.00', 'Estación Vesta-2', '2026-11-10'),
('Auditor de implantes neuronales', 2, 3, 'Revisión de firmware de implantes médicos antes de su aprobación.', 1, '58000.00', 'Remoto desde cualquier colonia', '2026-11-12'),
('Programador de drones de terraformación', 4, 3, 'Programación de enjambres de drones que siembran líquenes en Marte.', 3, '49500.00', 'Valles Marineris, Marte', '2026-11-15');

-- Postulaciones (ofertas_trabajadores)
INSERT INTO public.ofertas_trabajadores (id_ofertas, id_trabajador) VALUES
(1, 1), -- Javier (piloto minero) se inscribe en Minero de asteroides
(5, 1), -- Javier (piloto minero) se inscribe en Piloto de carguero orbital
(2, 2), -- Sofía (netrunner) se inscribe en Netrunner de seguridad corporativa
(6, 2), -- Sofía (netrunner) se inscribe en Auditor de implantes neuronales
(4, 3), -- Miguel (androides) se inscribe en Técnico de mantenimiento de androides
(3, 4), -- Ana Belén (bioingeniera) se inscribe en Bioingeniero de cultivos marcianos
(7, 4); -- Ana Belén (bioingeniera) se inscribe en Programador de drones de terraformación

COMMIT;