import React from 'react';
import Button from "./Button";

const Table = ({ list, onDismiss }) => {
  return (
    <div className="table">
      {list.map((item) => (
        <React.Fragment>
          {item.objectID && item.url && item.title && item.author && item.num_comments && item.points ? 
          <div key={item.objectID} className="table-row">
            <span className="large-width">
              <a href={item.url}>{item.title}</a>
            </span>
            <span className="medium-width">
              {item.author}</span>
            <span className="small-width">
              {item.num_comments}</span>
            <span className="small-width">
              {item.points}</span>
            <span className="small-width">
              <Button 
                onClick={() => onDismiss(item.objectID)}
                className='button-inline'
              >
                X
              </Button>
            </span>
          </div>
        : null
        }
        </React.Fragment>
        ))}
      
    </div>
  );
}

export default Table;
