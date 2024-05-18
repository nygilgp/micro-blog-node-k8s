export const CommentList = ({ comments }) => {
  const renderComments = Object.values(comments).map((comment) => {
    let { status, content } = comment;
    switch (status) {
      case 'rejected':
        content = 'This comment has been rejected';
        break;
      case 'pending':
        content = 'This comment is awaiting moderation';
        break;

      default:
        break;
    }
    return <li key={comment.id}>{content}</li>;
  });
  return (
    <div>
      {comments && (
        <>
          <h3>Comments</h3>
          <ul>{renderComments}</ul>
        </>
      )}
    </div>
  );
};
