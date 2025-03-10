'use client';

import { useState } from 'react';
import { StoredBlobsList } from './list';
import { NewShape } from './new-shape';

export function ShapeEditor(props) {
    const [lastMutationTime, setLastMutationTime] = useState(0);
    const [editableContent, setEditableContent] = useState('');

    const handleContentChange = (e) => {
        setEditableContent(e.target.value);
    };

    return (
        <div className="flex w-full flex-col md:flex-row md:items-start gap-8">
            <div className="md:w-2/5">
                <NewShape setLastMutationTime={setLastMutationTime} />
                <input 
                    type="text" 
                    value={editableContent} 
                    onChange={handleContentChange} 
                    placeholder="Edit content here" 
                />
            </div>
            <div className='w-full'>
                <StoredBlobsList lastMutationTime={lastMutationTime} />
            </div>
        </div>
    );
}
