drop database if exists scholar;
create database scholar;
use scholar;

create table questions (
	id int not null auto_increment primary key,
	mcq boolean not null default false,
	text varchar(255) not null,
	level varchar(255) not null default 'easy',
	created datetime not null default now(),
    modified datetime not null default now() on update now()
);

create table options (
	id int not null auto_increment primary key,
	text varchar(255) not null,
	questionId int not null,
	isAnswer boolean default false,
	created datetime not null default now(),
    modified datetime not null default now() on update now(),
	foreign key (questionId) references questions(id) on delete cascade
);

create table tags (
	id int not null auto_increment primary key,
	questionId int not null,
	tag varchar(255) not null,
	created datetime not null default now(),
    modified datetime not null default now() on update now(),
	foreign key (questionId) references questions(id) on delete cascade
);

insert into questions (text) values
('If Super class method throws an exception, then Subclass overridden method...');

insert into options (questionId, text) values
(1, 'Can throw the same exception.'),
(1, 'Can throw no exception.'),
(1, 'Can throw child class of the exception thrown by Super class method.');

insert into options (questionId, text, isAnswer) values
(1, 'Can throw parent exception of the exception thrown by Super class method.', true);

insert into tags (questionId, tag) values
(1, 'core-java');

-- q & a
select q.text as 'Question', o.text as 'Answer' from questions q join options o
on q.id=o.questionId and isAnswer;


/*
create table answers (
	id int not null auto_increment primary key,
	questionId int not null,
	optionId int not null,
	created datetime not null default now(),
    modified datetime not null default now() on update now(),
	foreign key (questionId) references questions(id) on delete cascade,
	foreign key (optionId) references options(id) on delete cascade
);

insert into answers (questionId, optionId) values
(1, 4);

create table users (
	id int not null auto_increment primary key,
	username varchar(255) not null,
	firstName varchar(255) not null,
	lastName varchar(255) not null,
	created datetime not null default now(),
	score int not null default 0,
    modified datetime not null default now() on update now()
);

-- q & a
select q.text as 'Question', o.text as 'Answer' from questions q join options o join answers a
on q.id=o.questionId and o.id=a.optionId;
*/