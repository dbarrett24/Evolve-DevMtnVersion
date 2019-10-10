DELETE FROM habits
WHERE id = $1;

--Frequency foreign key is tied to this table and cascades upon delete.