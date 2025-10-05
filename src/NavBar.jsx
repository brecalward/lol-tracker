import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <div className="flex gap-10 justify-center">
      <Button className="mt-15 w-40 bg-red-500 hover:bg-green-600">Home</Button>
      <Button className="mt-15 w-40 bg-red-500 hover:bg-green-600">
        Champion Information
      </Button>
      <Button className="mt-15 w-40 bg-red-500 hover:bg-green-600">
        About
      </Button>
      <Button className="mt-15 w-40 bg-red-500 hover:bg-green-600">
        Top Rated
      </Button>
    </div>
  );
}
