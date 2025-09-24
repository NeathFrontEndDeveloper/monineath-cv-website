export const ProjectError = ({ message }: { message: string }) => (
  <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <h1 className="text-6xl ">Something went wrong.</h1>
        </div>
        <p className="text-gray-400 text-xl">{message}</p>
      </div>
    </div>
  </>
);
