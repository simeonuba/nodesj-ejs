# Of-max Backend

built with python

## how to run this project locally
Clone this project

create virtual environment
```bash
python -m venv venv
```

activate virtual environment 
```bash
# for windows 
venv\scripts\activate

# for mac 
venv/bin/activate
```

install dependencies
```bash
pip install -r requirements.txt
```

migrate models
```bash
python manage.py migrate
```

create super admin
```bash
python manage.py createsuperuser
```

run server
```bash
python manage.py runserver
```