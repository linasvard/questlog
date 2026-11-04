import { useNavigate, useParams } from 'react-router';

const EditGamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit Game {gameId}</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default EditGamePage;
