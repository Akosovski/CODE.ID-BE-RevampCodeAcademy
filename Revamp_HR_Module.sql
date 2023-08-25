-- Module Human Resource
/*
create schema HR

create table HR.employee (
	emp_entity_id integer, -- PK & FK References users.user_entity_id <==
	emp_emp_number varchar(25) unique,
	emp_national_id varchar(25) unique,
	------------------------------------
	emp_birth_date date,
	emp_marital_status char(1), -- [M=Married|S=Single]
	emp_gender char(1), -- [M=Male|F=Female]
	emp_hire_date timestamp,
	emp_salaried_flag char(1), -- [0=Hourly|1=Salaried]
	emp_vacation_hours smallint,
	emp_sickleave_hours smallint,
	emp_current_flag smallint, -- [0=Inactive|1=Active]
	emp_modified_date timestamp,
	emp_type varchar(15), -- [Internal|Outsource]
	------------------------------------
	emp_joro_id integer, -- FK References job_role.joro_id <==
	emp_emp_entity_id integer -- FK References employee.emp_entity_id
);

alter table HR.employee add constraint pk_emp_entity_id primary key(emp_entity_id);
alter table HR.employee add constraint fk_emp_emp_entity_id foreign key (emp_emp_entity_id) 
references HR.employee(emp_entity_id) ON DELETE CASCADE ON UPDATE CASCADE;

create table HR.employee_pay_history (
	ephi_entity_id integer, -- PK & FK References employee.emp_entity_id
	ephi_rate_change_date timestamp, -- PK
	------------------------------------
	ephi_rate_salary numeric,
	ephi_pay_frequence smallint, -- [1=Monthly|2=Weekly]
	ephi_modified_date timestamp
);

alter table HR.employee_pay_history add constraint fk_ephi_entity_id foreign key (ephi_entity_id) 
references HR.employee(emp_entity_id) ON DELETE CASCADE ON UPDATE CASCADE;
alter table HR.employee_pay_history add constraint pk_ephi_rate_change_date primary key(ephi_rate_change_date);

create table HR.department (
	dept_id serial, -- PK
	dept_name varchar(50),
	dept_modified_date timestamp
);

alter table HR.department add constraint pk_dept_id primary key(dept_id);

create table HR.employee_department_history (
	edhi_id serial, -- PK
	edhi_entity_id integer, -- PK & FK References employee.emp_entity_id
	-----------------------------------
	edhi_start_date timestamp,
	edhi_end_date timestamp,
	edhi_modified_date timestamp,
	-----------------------------------
	edhi_dept_id integer -- FK References department.dept_id
);

alter table HR.employee_department_history add constraint pk_edhi_id primary key(edhi_id, edhi_entity_id);
alter table HR.employee_department_history add constraint fk_edhi_entity_id foreign key (edhi_entity_id) 
references HR.employee(emp_entity_id) ON DELETE CASCADE ON UPDATE CASCADE;
alter table HR.employee_department_history add constraint fk_edhi_dept_id foreign key (edhi_dept_id) 
references HR.department(dept_id) ON DELETE CASCADE ON UPDATE CASCADE;

create table HR.employee_client_contract (
	ecco_id serial, -- PK
	ecco_entity_id integer, -- PK & FK References employee.emp_entity_id
	----------------------------------
	ecco_contract_no varchar(55),
	ecco_contract_date timestamp,
	ecco_start_date timestamp,
	ecco_end_date timestamp,
	ecco_notes varchar(512),
	ecco_modified_date timestamp,
	ecco_media_link varchar(255),
	----------------------------------
	ecco_joty_id integer, -- FK master.job_type.joty_id <==
	ecco_account_manager integer, -- FK Notes Dibawah
	ecco_clit_id integer, -- FK References job.client.clit_id <==
	ecco_status varchar(15) -- FK [Onsite|Online|Hybrid] References master.status.status <==
);

alter table HR.employee_client_contract add constraint pk_ecco_id primary key(ecco_id, ecco_entity_id);

alter table HR.employee_client_contract add constraint fk_ecco_entity_id foreign key (ecco_entity_id) 
references HR.employee(emp_entity_id) ON DELETE CASCADE ON UPDATE CASCADE;

*/

-- alter table HR.employee_client_contract add constraint fk_ecco_account_manager foreign key (ecco_account_manager) 
-- references HR.employee(emp_entity_id) ON DELETE CASCADE ON UPDATE CASCADE;
-- ecco_account_manager diambil dari emp_entity_id table employee yang memiliki role AM (Account Manager).

-- INSERT Data HR Module

/*
insert into hr.job_role (joro_id, joro_name) values
(1, 'Software Developer'),
(2, 'Data Engineer'),
(3, 'Java Developer'),
(4, 'QA'); 

insert into hr.employee (emp_entity_id, emp_emp_number, emp_national_id, emp_birth_date, emp_marital_status,
						 emp_gender, emp_hire_date, emp_salaried_flag, emp_vacation_hours, emp_sickleave_hours, emp_current_flag, emp_emp_entity_id) values 
(1, 202207001, 13419981009004, '1998-03-12', 'M', 'M', '2020-10-1', 1, 12, 12, 1, 5),
(4, 202207002, 13420021009004, '2002-01-12', 'S', 'F', '2020-6-13', 1, 12, 12, 1, 0),
(5, 202205001, 13419771009005, '1977-01-12', 'M', 'M', '2021-10-13', 1, 12, 12, 1, 0),
(7, 202205035, 13419771009006, '1998-03-12', 'S', 'F', '2021-10-13', 1, 12, 12, 1, 5);

insert into hr.department (dept_id, dept_name) values
(1, 'Development'),
(2, 'Sales'),
(3, 'Bootcamp Academy');

insert into hr.employee_department_history (edhi_id, edhi_prog_id, edhi_start_date, edhi_end_date, edhi_dept_id) values
(1, 1, '2019-07-12', '2020-07-12', 1),
(2, 1, '2019-07-12', '', 3);

insert into hr.employee_pay_history (ephi_prog_id, ephi_rate_change_date, ephi_rate_salary, ephi_pay_frequence) values
(1, '2019-07-12', 6000000, 1),
(2, '2020-07-12', 7000000, 1);

insert into hr.employee_client_contract (ecco_id, ecco_entity_id, ecco_contract_no, ecco_contract_date, ecco_start_date, 
										ecco_end_date, ecco_media_link, ecco_status, ecco_joty_id, 
										ecco_account_manager, ecco_clit_id) values 
(1, 4, '002/HR-CODE.ID/PKWTT/I/2022', '2022-06-13', '2023-06-13', '2023-06-13', 'https://codeacademy/assets/contract.pdf', 'contract', 1, 5, 1);

---------------------------------- DATA ADDITION INTO TALENT ----------------------------------------

UPDATE users.users
SET user_first_name = 'Andhika', user_last_name = 'Pratama'
WHERE user_entity_id = '9';

UPDATE users.users
SET user_first_name = 'Yugo', user_last_name = 'Ardan'
WHERE user_entity_id = '8';

INSERT INTO users.business_entity (entity_id) VALUES
(10),
(11),
(12),
(13),
(14);

INSERT INTO hr.employee (emp_entity_id, emp_emp_number, emp_national_id, emp_birth_date, emp_marital_status, emp_gender, emp_hire_date, emp_salaried_flag, emp_vacation_hours, emp_sickleave_hours, emp_current_flag, emp_type, emp_joro_id)
VALUES
(9, 202308001, 13419465645004, '1995-03-12', 'M', 'M','2020-01-10', '1', 12, 12, 1, 'Internal', 1),
(10, 202308002, 13420021009564, '2022-02-25', 'S', 'F','2020-01-11', '1', 12, 12, 1, 'Outsource', 1),
(11, 202308003, 13432323213005, '2022-02-25', 'S', 'M','2020-01-12', '1', 12, 12, 1, 'Outsource', 1),
(12, 202308004, 13416765567006, '2022-02-25', 'S', 'M','2020-01-13', '1', 12, 12, 1, 'Outsource', 1),
(13, 202308005, 13414564363226, '2022-02-25', 'M', 'M','2020-01-13', '1', 12, 12, 1, 'Outsource', 1),
(14, 202308006, 13419434556316, '2022-02-25', 'S', 'M','2020-01-13', '1', 12, 12, 1, 'Outsource', 1);

INSERT INTO users.users (user_entity_id, user_name, user_password, user_first_name, user_last_name, user_email_promotion, user_demographic, user_photo, user_current_role)
VALUES
(10, 'latenna', 'gfdgfsdgfagfdg', 'Latenna', 'Albinauric', 1, '{"latitude":12.90,"longitude":-99.989}', 'latenna.png', 2),
(11, 'morgot', 'hgjfhngfhghh', 'Altus', 'Morgot', 1, '{"latitude":12.90,"longitude":-99.989}', 'morgot.png', 2),
(12, 'godrick', 'hjgjygfjygjfhjg', 'Goldy', 'Godrick', 1, '{"latitude":12.90,"longitude":-99.989}', 'godrick.png', 2),
(13, 'godfrey', 'hureabtgkdagfdd', 'Griffith', 'Godfrey', 1, '{"latitude":12.90,"longitude":-99.989}', 'godfrey.png', 2),
(14, 'vyke', 'ugyhthskgjdf', 'Festery', 'Vyke', 1, '{"latitude":12.90,"longitude":-99.989}', 'vyke.png', 2);

INSERT INTO users.users_email (pmail_entity_id, pmail_address)
VALUES 
(9, 'andhika@rocketmail.com'),
(10, 'latenna@rocketmail.com'),
(11, 'morgot@rocketmail.com'),
(12, 'godrick@starmail.com'),
(13, 'godfrey@rocketmail.com'),
(14, 'vyke@tablemail.com');

INSERT INTO users.users_phones (uspo_entity_id, uspo_number, uspo_ponty_code)
VALUES
(9, '823243439283', 'Cell'),
(10, '823232839283', 'Cell'),
(11, '823723237273', 'Cell'),
(12, '846454562742', 'Cell'),
(13, '852476845476', 'Cell'),
(14, '857645643513', 'Cell');

INSERT INTO bootcamp.batch (batch_id, batch_entity_id, batch_name, batch_description, batch_start_date, batch_end_date, batch_reason, batch_type, batch_modified_date, batch_status, batch_pic_id) 
VALUES 
(2, 2, 'Batch#16', NULL, '2021-02-12', '2021-06-12', NULL, 'offline', '2023-07-06', 'Closed', NULL),
(3, 3, 'Batch#17', NULL, '2022-02-12', '2022-06-12', NULL, 'offline', '2023-07-06', 'Closed', NULL);

INSERT INTO bootcamp.batch_trainee (batr_id, batr_status, batr_certificated, batre_certificate_link, batr_access_token, batr_access_grant, batr_review, batr_total_score, batr_modified_date, batr_trainee_entity_id, batr_batch_id)
VALUES 
(3, 'passed', '0', NULL, NULL, '0', 'selama bootcamp latenna ok great', 90, '2023-07-06', 10, 2),
(4, 'passed', '0', NULL, NULL, '0', 'selama bootcamp morgot ok nice', 72, '2023-07-06', 11, 3),
(5, 'passed', '0', NULL, NULL, '0', 'selama bootcamp godrick ok great', 88, '2023-07-06', 12, 2),
(6, 'passed', '0', NULL, NULL, '0', 'selama bootcamp godfrey ok nice', 78, '2023-07-06', 13, 3),
(7, 'passed', '0', NULL, NULL, '0', 'selama bootcamp vyke ok good', 80, '2023-07-06', 14, 3),
(8, 'passed', '0', NULL, NULL, '0', 'selama bootcamp andhika ok good', 80, '2023-07-06', 9, 2);

INSERT INTO users.roles (role_id, role_name, role_type)
VALUES
(13, 'Employee Trial', 'External');

*/

select * from hr.employee;














































