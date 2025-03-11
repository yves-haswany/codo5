import { useState } from 'react';
import { useContentfulLivePreview } from '@contentful/live-preview';

function VisualEditorComponent({ contentId, fieldName }) {
    const [editableContent, setEditableContent] = useState('');

    const handleContentChange = (e) => {
        setEditableContent(e.target.value);
    };

    const content = useContentfulLivePreview(contentId, fieldName);

    return (
        <div>
            <input 
                type="text" 
                value={editableContent} 
                onChange={handleContentChange} 
                placeholder="Edit content here" 
            />
            <div>{content}</div>
        </div>
    );
}

export default VisualEditorComponent;
