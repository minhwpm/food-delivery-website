"use client";
import { useEffect, useRef, useState } from "react"

export const useToggleDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [ dropdownOpen, setDropdownOpen ] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownOpen])

  return { dropdownRef, dropdownOpen, toggleDropdown }
}