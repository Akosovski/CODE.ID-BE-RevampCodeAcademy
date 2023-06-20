-- Module Human Resource

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

-- alter table HR.employee_client_contract add constraint fk_ecco_account_manager foreign key (ecco_account_manager) 
-- references HR.employee(emp_entity_id) ON DELETE CASCADE ON UPDATE CASCADE;
-- ecco_account_manager diambil dari emp_entity_id table employee yang memiliki role AM (Account Manager).

