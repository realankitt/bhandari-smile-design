
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type BlogCardProps = {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
};

export function BlogCard({ title, excerpt, date, image, category, slug }: BlogCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-dental-500 text-white text-xs font-medium px-2.5 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
      
      <CardHeader className="pt-6 pb-3">
        <h3 className="text-xl font-bold line-clamp-2 hover:text-dental-600 transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-gray-600 line-clamp-3">
          {excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon size={14} className="mr-1" />
          {date}
        </div>
        
        <Button
          variant="link"
          asChild
          className="text-dental-600 font-medium p-0 h-auto hover:text-dental-700"
        >
          <Link to={`/blog/${slug}`}>Read More →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
