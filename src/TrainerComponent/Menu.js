import React from 'react'
import { Link } from 'react-router-dom'
import {
    ListGroup,

} from 'reactstrap'
export const Menu = () => {
    console.log('Rendering Menu');

    return (
        <div>
            <ListGroup>
              

                    <Link className='list-group-item list-group-item-action' tag='a' to="/trainerHome">
                    Home
                    </Link>
                    <Link className='list-group-item list-group-item-action' tag='a' to="/view-courses">
                    View Courses
                    </Link>
                    <Link className='list-group-item list-group-item-action' tag='a' to="/addCourse">
                    Add Course
                    </Link>

            </ListGroup>

        </div>
    )
}

export default Menu;