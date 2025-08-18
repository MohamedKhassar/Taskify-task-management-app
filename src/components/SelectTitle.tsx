
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { userTitles } from "@/utils/data"
import { Input } from "./ui/input"
import { useState } from "react"

export function SelectTitle() {
    const [search, setSearch] = useState("")

    const filteredTitles = userTitles.filter((title) =>
        title.toLowerCase().includes(search.toLowerCase())
    )
    return (
        <Select>
            <SelectTrigger className="w-full border-sky-600">
                <SelectValue placeholder="Select your title" />
            </SelectTrigger>

            <SelectContent className="space-y-2">
                {/* Search input */}
                <div className="px-2">
                    <Input
                        type="search"
                        placeholder="Search title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-sky-600 my-2 w-full"
                    />
                </div>

                {/* Filtered list */}
                <SelectGroup className="max-h-48 overflow-y-auto focus:!ring-sky-500">
                    {filteredTitles.length > 0 ? (
                        filteredTitles.map((title) => (
                            <SelectItem key={title} value={title}>
                                {title}
                            </SelectItem>
                        ))
                    ) : (
                        <p className="text-center text-xs text-gray-500 py-2">
                            No results found
                        </p>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
