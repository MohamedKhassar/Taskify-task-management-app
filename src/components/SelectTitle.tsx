import { Button } from "@/components/ui/button"
import { useState } from "react"
import { userTitles } from "@/utils/data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchableSelect({ selectedTitle, setSelectedTitle }: { selectedTitle?: string, setSelectedTitle: (value: string) => void }) {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn("!border-sky-600 justify-between",
                    selectedTitle?"dark:text-white":"text-gray-400"
                )}>
                    {selectedTitle || "Select your title"}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="shadow-2xl">
                <Command>
                    <CommandInput placeholder="Search title..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-54 overflow-y-scroll scrollbar scrollbar-track-slate-50 scrollbar-thumb-sky-900 ">
                        {userTitles.map((title) => (
                            <CommandItem
                                key={title}
                                onSelect={() => {
                                    setSelectedTitle(title)
                                    setOpen(false)
                                }}
                                className={cn("cursor-pointer flex justify-between items-center my-2 p-2",
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
