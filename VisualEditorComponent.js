import { useContentfulLivePreview } from '@contentful/live-preview'; // Import the Contentful live preview hook

// Component to render live preview content from Contentful
function VisualEditorComponent({ contentId, fieldName }) {
  console.log("[VisualEditorComponent] Rendering content with ID:", contentId, "and field name:", fieldName);
  const content = useContentfulLivePreview(contentId, fieldName); // Use the Contentful live preview hook
  console.log("[VisualEditorComponent] Live preview content:", content);
  return <div>{content}</div>; // Render the content in a div element
}

export default VisualEditorComponent; // Export the component as default
