import { Card } from "./Card";

export function Game() {
  return (
    <>
      <div className="flex flex-col bg-transparent h-full w-full border-0">
        <div className="grid grid-cols-4 grid-rows-4 max-w-sm mx-auto gap-2 p-1">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
        <span className="font-bold text-center text-gray-200 m-12">
          Current Multiplier:
        </span>
      </div>
    </>
  );
}
