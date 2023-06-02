-- Escribe tus querys acá
-- Consulta 1: 
SELECT Cliente.correo
FROM Cliente
JOIN Compra ON Cliente.id_cliente = Compra.id_cliente
WHERE Compra.id_pasarela = 'transbank'
GROUP BY Cliente.id_cliente
HAVING COUNT(*) > 1;

-- Consulta 2: 
SELECT * 
FROM Compra c, Informe i
WHERE c.id_informe = i.id_informe
    AND c.id_cliente = (SELECT id_cliente FROM Cliente WHERE correo = 'juan_daniel@gmail.com')
    AND i.estado = 'entregado';