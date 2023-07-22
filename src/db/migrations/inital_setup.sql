CREATE TABLE contact(
	id SERIAL primary key,
	phone_number VARCHAR,
	email VARCHAR,
	linked_id INT,
	link_precedence VARCHAR,
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP DEFAULT now(),
	deleted_at TIMESTAMP
)

CREATE TYPE "enum_link_precedence" AS ENUM (
  'primary',
  'secondary'
);

ALTER TABLE contact
ALTER COLUMN link_precedence SET DEFAULT 'primary'::enum_link_precedence;