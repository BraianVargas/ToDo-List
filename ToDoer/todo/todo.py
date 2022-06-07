from distutils.log import error
from turtle import title
from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)

from werkzeug.exceptions import abort
from todo.auth import login_required
from todo.db import getDB


bp = Blueprint('todo', __name__)

@bp.route('/')
@login_required
def index():
    db, c = getDB()
    c.execute(
        """ 
        SELECT t.id, t.title, t.description, u.username, t.completed, t.created_at 
        FROM todo t JOIN user u on t.created_by = u.id ORDER BY created_at DESC
        """
    )
    todos = c.fetchall()

    return render_template('todo/index.html', todos=todos)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        error = None
        if not title:
            error = 'Title is required.'
        elif not description:
            error = 'Description is required.'
        if error is not None:
            flash(error)
        else:
            db, c = getDB()
            c.execute("INSERT INTO todo (title, description, created_by) VALUES (%s, %s, %s)", (title, description, g.user['id']))
            db.commit()
            flash('Todo created successfully.', 'success')
        return redirect(url_for('todo.index'))
    else:
        return render_template('todo/create.html')

def getToDo(id):
    db, c = getDB()
    c.execute("SELECT t.id, t.title, t.description, t.completed, t.created_by, t.created_at, u.username FROM todo t JOIN user u ON t.created_by = u.id WHERE t.id = %s", (id,))
    todo = c.fetchone()
    if todo is None:
        abort(404, "La tarea de id {0} no existe".format(id))
    return todo


@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    todo = getToDo(id)

    if request.method == 'POST':
        print(todo)
        title = request.form['title']
        description = request.form['description']
        completed = True if request.form.get('completed') == 'on' else False
        error = None

        if not title:
            error = "Titulo es requerido"
        if not description:
            error = "Descripcion es requerido"

        print(error)
        
        if error is not None:
            flash(error)
        else:
            db, c = getDB()
            c.execute("UPDATE todo SET title = %s, description = %s, completed = %s WHERE id = %s", (title, description, completed, id))
            db.commit()
            return redirect(url_for('todo.index'))
    return render_template('todo/update.html', task = todo)

@bp.route('/<int:id>/delete', methods=['POST'])
@login_required
def delete():
    return ''
