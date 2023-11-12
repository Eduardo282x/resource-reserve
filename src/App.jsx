
import {Button} from "@nextui-org/react";

export default function App() {
  return (
    <div className="ml-5">
        <Button color="primary">
          Button
        </Button>

        <div className="flex flex-wrap gap-4 justify-center items-center my-6 py-10 border-white border-solid border-2 w-40 h-40 m-auto">
      <Button color="default">
        Default
      </Button>
      <Button color="primary">
        Primary
      </Button>  
      <Button color="secondary">
        Secondary
      </Button>  
      <Button color="success">
        Success
      </Button>  
      <Button color="warning">
        Warning
      </Button>  
      <Button color="danger">
        Danger
      </Button>  
    </div>
    </div>
  );
}
