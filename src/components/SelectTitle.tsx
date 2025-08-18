import { Button } from "@/components/ui/button"
import { useState } from "react"
import { userTitles } from "@/utils/data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/utils/cn"

export function SearchableSelect({ selectedTitle, setSelectedTitle }: { selectedTitle?: string, setSelectedTitle: (value: string) => void }) {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="!border-sky-600 justify-between">
                    {selectedTitle || "Select your title"}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="max-h-48 overflow-y-auto shadow-2xl">
                <Command>
                    <CommandInput placeholder="Search title..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {userTitles.map((title) => (
                            <CommandItem
                                key={title}
                                onSelect={() => {
                                    setSelectedTitle(title)
                                    setOpen(false)
                                    console.log(title)
                                }}
                                className={cn("cursor-pointer flex justify-between items-center my-1",
                                    selectedTitle === title && "bg-accent"
                                )}
                            >
                                {title}
                                {
                                    selectedTitle === title && (
                                        <Check />
                                    )
                                }
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
