import { useNavigate } from "react-router-dom";

interface DeleteEntityProps {
  endpoint: string;
  entityName: string;
  redirectPath?: string;
  onDelete?: () => void; // פרופ אופציונלי לעדכון הסטייט
}

const DeleteEntity: React.FC<DeleteEntityProps> = ({ endpoint, entityName, redirectPath, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this ${entityName}?`)) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${entityName}`);
      }

      alert(`${entityName} deleted successfully`);

      // עדכון הסטייט אם onDelete הועבר
      if (onDelete) {
        onDelete();
      } else if (redirectPath) {
        navigate(redirectPath);
      }
    } catch (err) {
      alert(`Error deleting ${entityName}: ${err.message}`);
    }
  };

  return <button onClick={handleDelete}>delete {entityName}</button>;
};

export default DeleteEntity;