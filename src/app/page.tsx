export const metadata = {
  title: "Home: work Manager",
};
export default function Home() {
  return (
    <>
      <div className="homeBgImage">
        <h1 className="text-5xl font-semibold headColor">Task Management</h1>
        <p className="my-3">Organize your tasks efficiently</p>

        <section className="mt-6 ">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold headColor">Easy to Use</h3>
            <p className="mt-3">
              Our tool is designed with simplicity in mind.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold headColor">Collaborate</h3>
            <p className="mt-3">Work with your team seamlessly.</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold headColor">Track Progress</h3>
            <p className="mt-3">
              Monitor your tasks and stay on top of deadlines.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
