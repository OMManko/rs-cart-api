create extension if not exists "uuid-ossp";

create type status_type AS enum ('OPEN', 'ORDERED');

create table if not exists carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status status_type
);

create table if not exists cart_items (
	product_id uuid not null default uuid_generate_v4() primary key,
	cart_id uuid,
	count integer not null,
	foreign key ("cart_id") references carts(id)
);

insert into carts (id, user_id, created_at, updated_at, status) values
('902f94ec-2cc4-4ad7-8080-178c3c08528e', '3f95c74f-924b-4076-b84a-173274078194', '2023-03-28', '2023-03-28', 'OPEN'),
('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'cc781593-4730-48d3-b4a1-29c26f28d0ca', '2023-03-29', '2023-03-29', 'ORDERED');

insert into cart_items (product_id, cart_id, count) values
('8ad63697-9c0c-4ab9-9136-9dcf4a0ccf3f', '902f94ec-2cc4-4ad7-8080-178c3c08528e', 4),
('a124d918-7a73-4bbf-8edb-070aaf23ba71', '7567ec4b-b10c-48c5-9345-fc73c48a80a2', 2);


insert into "user" (id, username, email, password) values
('3f95c74f-924b-4076-b84a-173274078194', 'testname', 'test@gmail.com', 'testpassword'),
('cc781593-4730-48d3-b4a1-29c26f28d0ca', 'vmanko', 'vmanko@gmail.com', 'qwerty');


insert into orders (id, user_id, cart_id, payment, delivery, comments, status, total) values
('9c4d5912-d455-4c25-98ae-9bec19c966ca',
'cc781593-4730-48d3-b4a1-29c26f28d0ca',
'7567ec4b-b10c-48c5-9345-fc73c48a80a2',
cast('{"type": "credit card"}' as json),
cast('{"type": "curier", "city": "Berlin"}' as json),
'Super puper order',
'ORDERED',
10);