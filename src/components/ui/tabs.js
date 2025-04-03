export const Tabs = ({ children }) => <div>{children}</div>;
export const TabsList = ({ children }) => <div className="flex gap-2 mb-4">{children}</div>;
export const TabsTrigger = ({ children, ...rest }) => <button {...rest}>{children}</button>;
export const TabsContent = ({ children }) => <div>{children}</div>;