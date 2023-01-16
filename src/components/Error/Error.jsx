import React from 'react';

const Error = ({ children, ...props }) => {
    return (
        <div
            style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}
            {...props}
        >{children.map((error) => {
            return error.msg;
        }

        )}
            {/*children*/}
        </div>
    );
}

export default Error;
